# Assessment API Configuration

## External API Integration

The assessment UI connects to an **external API server** using the project's existing `clientApi` (Axios) configuration.

## Environment Setup

### Required Environment Variable

Add to your `.env` file:
```env
NEXT_PUBLIC_API_URL=https://your-api-server.com
```

Example values:
```env
# Development
NEXT_PUBLIC_API_URL=http://localhost:4000

# Staging
NEXT_PUBLIC_API_URL=https://api-staging.licenciacostarica.com

# Production
NEXT_PUBLIC_API_URL=https://api.licenciacostarica.com
```

## API Client Configuration

The assessment system uses the existing `clientApi` from `src/lib/clientApi.ts`:

```typescript
// src/lib/clientApi.ts
import axios from 'axios';

export const clientApi = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
});
```

All assessment API calls go through this client:

```typescript
// src/lib/api/assessment.ts
import { clientApi } from '@/lib/clientApi';

export async function fetchManuals() {
    const response = await clientApi.get('/api/assessments/manuals');
    return response.data;
}
```

## Expected API Endpoints

Your external API server must implement these endpoints:

### 1. Get Published Manuals

```
GET ${NEXT_PUBLIC_API_URL}/api/assessments/manuals
```

**Response:**
```json
[
  {
    "id": "uuid-1",
    "title": "Manual de Seguridad Vial",
    "description": "Manual completo sobre seguridad vial en Costa Rica",
    "status": "published",
    "chapterCount": 12,
    "createdAt": "2024-01-01T00:00:00Z",
    "updatedAt": "2024-01-15T00:00:00Z"
  },
  {
    "id": "uuid-2",
    "title": "Señales de Tránsito",
    "description": "Guía completa de señales de tránsito",
    "status": "published",
    "chapterCount": 8,
    "createdAt": "2024-01-05T00:00:00Z",
    "updatedAt": "2024-01-20T00:00:00Z"
  }
]
```

**Status Codes:**
- `200` - Success
- `500` - Server error

---

### 2. Generate Assessment

```
POST ${NEXT_PUBLIC_API_URL}/api/assessments/manuals/{manualId}/generate
```

**Request Body:**
```json
{
  "manualId": "uuid-1",
  "questionCount": 40
}
```

**Response:**
```json
{
  "assessmentId": "assessment-uuid-123",
  "manual": {
    "id": "uuid-1",
    "title": "Manual de Seguridad Vial"
  },
  "questions": [
    {
      "id": "question-uuid-1",
      "questionText": "¿Cuál es la velocidad máxima en zona escolar?",
      "chapterId": "chapter-uuid-1",
      "chapterTitle": "Límites de Velocidad",
      "answers": [
        {
          "id": "answer-uuid-1",
          "answerText": "25 km/h"
        },
        {
          "id": "answer-uuid-2",
          "answerText": "40 km/h"
        },
        {
          "id": "answer-uuid-3",
          "answerText": "60 km/h"
        },
        {
          "id": "answer-uuid-4",
          "answerText": "80 km/h"
        }
      ]
    }
    // ... 39 more questions
  ],
  "totalQuestions": 40,
  "generatedAt": "2024-01-25T10:30:00Z"
}
```

**Status Codes:**
- `200` - Success
- `400` - Invalid request (e.g., invalid manualId)
- `404` - Manual not found
- `500` - Server error

---

### 3. Grade Assessment

```
POST ${NEXT_PUBLIC_API_URL}/api/assessments/grade
```

**Request Body:**
```json
{
  "assessmentId": "assessment-uuid-123",
  "manualId": "uuid-1",
  "answers": [
    {
      "questionId": "question-uuid-1",
      "answerId": "answer-uuid-1"
    },
    {
      "questionId": "question-uuid-2",
      "answerId": "answer-uuid-3"
    }
    // ... 40 answers total
  ]
}
```

**Response:**
```json
{
  "assessmentId": "assessment-uuid-123",
  "manual": {
    "id": "uuid-1",
    "title": "Manual de Seguridad Vial"
  },
  "score": {
    "correct": 35,
    "incorrect": 5,
    "total": 40,
    "percentage": 87.5,
    "passed": true,
    "grade": "B+"
  },
  "results": [
    {
      "questionId": "question-uuid-1",
      "questionText": "¿Cuál es la velocidad máxima en zona escolar?",
      "chapterId": "chapter-uuid-1",
      "chapterTitle": "Límites de Velocidad",
      "userAnswerId": "answer-uuid-1",
      "correctAnswerId": "answer-uuid-1",
      "isCorrect": true,
      "userAnswerText": "25 km/h",
      "correctAnswerText": "25 km/h"
    },
    {
      "questionId": "question-uuid-2",
      "questionText": "¿Qué significa una señal triangular roja?",
      "chapterId": "chapter-uuid-2",
      "chapterTitle": "Señales de Tránsito",
      "userAnswerId": "answer-uuid-5",
      "correctAnswerId": "answer-uuid-6",
      "isCorrect": false,
      "userAnswerText": "Prohibición",
      "correctAnswerText": "Advertencia de peligro"
    }
    // ... 40 results total
  ],
  "studyRecommendations": {
    "shouldReview": true,
    "weakChapters": [
      {
        "chapterId": "chapter-uuid-2",
        "chapterTitle": "Señales de Tránsito",
        "incorrectCount": 3,
        "totalCount": 8,
        "accuracy": 62.5
      },
      {
        "chapterId": "chapter-uuid-5",
        "chapterTitle": "Intersecciones",
        "incorrectCount": 2,
        "totalCount": 5,
        "accuracy": 60.0
      }
    ],
    "summary": "Revisa el Capítulo 2: Señales de Tránsito y Capítulo 5: Intersecciones"
  },
  "gradedAt": "2024-01-25T10:45:00Z"
}
```

**Status Codes:**
- `200` - Success
- `400` - Invalid request (e.g., missing answers)
- `404` - Assessment not found
- `500` - Server error

---

## Error Handling

The UI expects errors in this format:

```json
{
  "message": "Human-readable error message",
  "error": "ERROR_CODE",
  "statusCode": 400
}
```

Example error responses:

### Manual Not Found
```json
{
  "message": "Manual no encontrado",
  "error": "MANUAL_NOT_FOUND",
  "statusCode": 404
}
```

### Insufficient Questions
```json
{
  "message": "No hay suficientes preguntas para generar una evaluación de 40 preguntas",
  "error": "INSUFFICIENT_QUESTIONS",
  "statusCode": 400
}
```

### Assessment Expired
```json
{
  "message": "La evaluación ha expirado. Por favor genera una nueva",
  "error": "ASSESSMENT_EXPIRED",
  "statusCode": 400
}
```

## CORS Configuration

Your external API must allow CORS from your Next.js application domain:

```javascript
// Example Express.js CORS configuration
const cors = require('cors');

app.use(cors({
  origin: [
    'http://localhost:3000',           // Development
    'https://licenciacostarica.com',   // Production
    'https://www.licenciacostarica.com'
  ],
  methods: ['GET', 'POST'],
  credentials: true
}));
```

## Testing the Connection

### 1. Check Environment Variable
```bash
echo $NEXT_PUBLIC_API_URL
```

### 2. Test API Endpoints
```bash
# Test manuals endpoint
curl ${NEXT_PUBLIC_API_URL}/api/assessments/manuals

# Test generate endpoint
curl -X POST ${NEXT_PUBLIC_API_URL}/api/assessments/manuals/{manualId}/generate \
  -H "Content-Type: application/json" \
  -d '{"manualId":"uuid-1","questionCount":40}'

# Test grade endpoint
curl -X POST ${NEXT_PUBLIC_API_URL}/api/assessments/grade \
  -H "Content-Type: application/json" \
  -d '{"assessmentId":"test","manualId":"uuid-1","answers":[...]}'
```

### 3. Run Development Server
```bash
npm run dev
# Visit http://localhost:3000/assessment
# Open browser console to see API calls
```

## Troubleshooting

### "Failed to fetch manuals"
- Check if `NEXT_PUBLIC_API_URL` is set
- Verify API server is running
- Check CORS configuration
- Check network tab for actual error

### "CORS policy error"
- Add your domain to API's CORS whitelist
- Check if credentials are required

### "404 Not Found"
- Verify endpoint paths match exactly
- Check API route configuration
- Ensure endpoints are deployed

### "Network Error"
- Verify API server is accessible
- Check firewall rules
- Verify SSL certificates (for HTTPS)

## Development vs Production

### Development
```env
NEXT_PUBLIC_API_URL=http://localhost:4000
```
- API runs locally
- No CORS issues (same origin)
- Hot reload enabled

### Production
```env
NEXT_PUBLIC_API_URL=https://api.licenciacostarica.com
```
- API on separate server
- CORS must be configured
- SSL/HTTPS required
- CDN/caching considerations

## Security Considerations

1. **HTTPS Only**: Use HTTPS in production
2. **CORS**: Whitelist only your domains
3. **Rate Limiting**: Implement on API side
4. **Validation**: Validate all inputs on backend
5. **Authentication**: Consider adding auth if needed (not currently implemented)

## Next Steps

1. Set `NEXT_PUBLIC_API_URL` in `.env`
2. Implement the 3 API endpoints on your server
3. Configure CORS
4. Test each endpoint
5. Deploy and verify in production

---

**Configuration Complete**: The UI is ready to connect to your external API server once these endpoints are implemented.
