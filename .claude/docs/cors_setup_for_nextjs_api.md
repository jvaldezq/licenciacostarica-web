# CORS Setup for Next.js API (on .app server)

## Problem
The assessment UI on `licenciacostarica.com` is making requests to `licenciacostarica.app/api/assessments/*` and getting CORS errors.

## Solution
Add CORS middleware to your Next.js API routes on the `.app` server.

---

## Option 1: Add CORS to Each API Route (Route Handler)

If you're using Next.js 13+ App Router with Route Handlers:

### File: `app/api/assessments/manuals/route.ts` (on .app server)

```typescript
import { NextRequest, NextResponse } from 'next/server';

// Allowed origins
const allowedOrigins = [
  'http://localhost:3000',
  'https://licenciacostarica.com',
  'https://www.licenciacostarica.com'
];

function corsHeaders(origin: string | null) {
  // Check if origin is allowed
  const isAllowed = origin && allowedOrigins.includes(origin);

  return {
    'Access-Control-Allow-Origin': isAllowed ? origin : allowedOrigins[0],
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Credentials': 'true',
  };
}

// Handle OPTIONS request (preflight)
export async function OPTIONS(request: NextRequest) {
  const origin = request.headers.get('origin');
  return NextResponse.json({}, {
    status: 200,
    headers: corsHeaders(origin)
  });
}

// Handle GET request
export async function GET(request: NextRequest) {
  const origin = request.headers.get('origin');

  try {
    // Your logic to fetch manuals
    const manuals = await fetchManualsFromDatabase();

    return NextResponse.json(manuals, {
      status: 200,
      headers: corsHeaders(origin)
    });
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to fetch manuals' },
      {
        status: 500,
        headers: corsHeaders(origin)
      }
    );
  }
}
```

### File: `app/api/assessments/manuals/[manualId]/generate/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';

const allowedOrigins = [
  'http://localhost:3000',
  'https://licenciacostarica.com',
  'https://www.licenciacostarica.com'
];

function corsHeaders(origin: string | null) {
  const isAllowed = origin && allowedOrigins.includes(origin);
  return {
    'Access-Control-Allow-Origin': isAllowed ? origin : allowedOrigins[0],
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Credentials': 'true',
  };
}

export async function OPTIONS(request: NextRequest) {
  const origin = request.headers.get('origin');
  return NextResponse.json({}, {
    status: 200,
    headers: corsHeaders(origin)
  });
}

export async function POST(
  request: NextRequest,
  { params }: { params: { manualId: string } }
) {
  const origin = request.headers.get('origin');

  try {
    const body = await request.json();
    const { manualId, questionCount } = body;

    // Your logic to generate assessment
    const assessment = await generateAssessment(manualId, questionCount);

    return NextResponse.json(assessment, {
      status: 200,
      headers: corsHeaders(origin)
    });
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to generate assessment' },
      {
        status: 500,
        headers: corsHeaders(origin)
      }
    );
  }
}
```

### File: `app/api/assessments/grade/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';

const allowedOrigins = [
  'http://localhost:3000',
  'https://licenciacostarica.com',
  'https://www.licenciacostarica.com'
];

function corsHeaders(origin: string | null) {
  const isAllowed = origin && allowedOrigins.includes(origin);
  return {
    'Access-Control-Allow-Origin': isAllowed ? origin : allowedOrigins[0],
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Credentials': 'true',
  };
}

export async function OPTIONS(request: NextRequest) {
  const origin = request.headers.get('origin');
  return NextResponse.json({}, {
    status: 200,
    headers: corsHeaders(origin)
  });
}

export async function POST(request: NextRequest) {
  const origin = request.headers.get('origin');

  try {
    const body = await request.json();

    // Your logic to grade assessment
    const results = await gradeAssessment(body);

    return NextResponse.json(results, {
      status: 200,
      headers: corsHeaders(origin)
    });
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to grade assessment' },
      {
        status: 500,
        headers: corsHeaders(origin)
      }
    );
  }
}
```

---

## Option 2: Create a CORS Utility (DRY Approach)

### File: `lib/cors.ts` (on .app server)

```typescript
import { NextRequest, NextResponse } from 'next/server';

const allowedOrigins = [
  'http://localhost:3000',
  'https://licenciacostarica.com',
  'https://www.licenciacostarica.com'
];

export function corsHeaders(origin: string | null) {
  const isAllowed = origin && allowedOrigins.includes(origin);

  return {
    'Access-Control-Allow-Origin': isAllowed ? origin : allowedOrigins[0],
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Credentials': 'true',
  };
}

export function handleCors(request: NextRequest, handler: () => Promise<NextResponse>) {
  const origin = request.headers.get('origin');

  // Handle preflight
  if (request.method === 'OPTIONS') {
    return NextResponse.json({}, {
      status: 200,
      headers: corsHeaders(origin)
    });
  }

  // Execute handler and add CORS headers
  return handler().then(response => {
    const headers = new Headers(response.headers);
    Object.entries(corsHeaders(origin)).forEach(([key, value]) => {
      headers.set(key, value);
    });

    return new NextResponse(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers
    });
  });
}
```

Then use it in your routes:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { handleCors, corsHeaders } from '@/lib/cors';

export async function OPTIONS(request: NextRequest) {
  const origin = request.headers.get('origin');
  return NextResponse.json({}, {
    status: 200,
    headers: corsHeaders(origin)
  });
}

export async function GET(request: NextRequest) {
  const origin = request.headers.get('origin');

  try {
    const manuals = await fetchManualsFromDatabase();
    return NextResponse.json(manuals, {
      status: 200,
      headers: corsHeaders(origin)
    });
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to fetch manuals' },
      { status: 500, headers: corsHeaders(origin) }
    );
  }
}
```

---

## Option 3: Global Middleware (Next.js 13+)

If you want CORS for ALL API routes:

### File: `middleware.ts` (at root of .app project)

```typescript
import { NextRequest, NextResponse } from 'next/server';

const allowedOrigins = [
  'http://localhost:3000',
  'https://licenciacostarica.com',
  'https://www.licenciacostarica.com'
];

export function middleware(request: NextRequest) {
  const origin = request.headers.get('origin');
  const isAllowedOrigin = origin && allowedOrigins.includes(origin);

  // Handle preflight requests
  if (request.method === 'OPTIONS') {
    return new NextResponse(null, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': isAllowedOrigin ? origin : allowedOrigins[0],
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Max-Age': '86400', // 24 hours
      },
    });
  }

  // Continue with the request and add CORS headers to response
  const response = NextResponse.next();

  if (isAllowedOrigin) {
    response.headers.set('Access-Control-Allow-Origin', origin);
  }
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  response.headers.set('Access-Control-Allow-Credentials', 'true');

  return response;
}

// Apply middleware only to API routes
export const config = {
  matcher: '/api/:path*',
};
```

---

## Option 4: Using next.config.js (Simple but less flexible)

### File: `next.config.js` (on .app server)

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        // Apply CORS headers to all API routes
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' }, // Change to specific origin in production
          { key: 'Access-Control-Allow-Methods', value: 'GET,DELETE,PATCH,POST,PUT,OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version' },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
```

**Better version with specific origins:**

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          {
            key: 'Access-Control-Allow-Origin',
            value: process.env.NODE_ENV === 'production'
              ? 'https://licenciacostarica.com'
              : 'http://localhost:3000'
          },
          { key: 'Access-Control-Allow-Methods', value: 'GET,POST,PUT,DELETE,OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type, Authorization' },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
```

---

## Recommended Approach

**For production, I recommend Option 3 (Middleware)** because:
- ✅ Applies to all API routes automatically
- ✅ Clean and maintainable
- ✅ Properly handles preflight OPTIONS requests
- ✅ Validates origins
- ✅ Easy to add more allowed origins

---

## Testing CORS

### 1. From browser console on localhost:3000
```javascript
fetch('https://www.licenciacostarica.app/api/assessments/manuals')
  .then(r => r.json())
  .then(console.log)
  .catch(console.error);
```

### 2. Using curl
```bash
# Test preflight
curl -X OPTIONS https://www.licenciacostarica.app/api/assessments/manuals \
  -H "Origin: http://localhost:3000" \
  -H "Access-Control-Request-Method: GET" \
  -v

# Test actual request
curl https://www.licenciacostarica.app/api/assessments/manuals \
  -H "Origin: http://localhost:3000" \
  -v
```

### 3. Check response headers
Look for these headers in the response:
- `Access-Control-Allow-Origin: http://localhost:3000`
- `Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS`
- `Access-Control-Allow-Headers: Content-Type, Authorization`

---

## Troubleshooting

### Still getting CORS errors?

1. **Clear browser cache** - Old CORS policies can be cached
2. **Check browser console** - Look for specific CORS error message
3. **Verify origin** - Make sure request origin matches allowed origins exactly
4. **Check preflight** - OPTIONS request must succeed before GET/POST
5. **Restart Next.js server** - Changes to middleware require restart
6. **Check deployment** - CORS settings must be deployed to .app server

### Common issues:

**"No 'Access-Control-Allow-Origin' header"**
- CORS headers not being added
- Check middleware is running

**"Origin not allowed"**
- Origin not in allowedOrigins array
- Check for typos (http vs https, www vs non-www)

**"Credentials mode but 'Access-Control-Allow-Credentials' not true"**
- Add `credentials: true` to fetch options
- Add `Access-Control-Allow-Credentials: true` header

---

## Production Deployment

Make sure to:
1. Add CORS configuration to `.app` server
2. Deploy changes to production
3. Test from `licenciacostarica.com`
4. Monitor for any CORS errors in production logs

**Don't forget**: CORS is configured on the **API server** (.app), not on the client (.com)!
