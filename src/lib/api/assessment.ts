import { clientApi } from '@/lib/clientApi';
import type {
    IManual,
    GenerateAssessmentRequest,
    GenerateAssessmentResponse,
    GradeAssessmentRequest,
    GradeAssessmentResponse
} from '@/lib/definitions';

/**
 * Fetches all published manuals available for assessment
 */
export async function fetchManuals(): Promise<IManual[]> {
    try {
        const response = await clientApi.get<IManual[]>('/assessments/manuals');
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Failed to fetch manuals');
    }
}

/**
 * Generates a new assessment with random questions from a manual
 */
export async function generateAssessment(
    manualId: string,
    questionCount = 40
): Promise<GenerateAssessmentResponse> {
    try {
        const response = await clientApi.post<GenerateAssessmentResponse>(
            `/assessments/manuals/${manualId}/generate`,
            { manualId, questionCount } as GenerateAssessmentRequest
        );
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Failed to generate assessment');
    }
}

/**
 * Grades a completed assessment and returns results with study recommendations
 */
export async function gradeAssessment(
    request: GradeAssessmentRequest
): Promise<GradeAssessmentResponse> {
    try {
        const response = await clientApi.post<GradeAssessmentResponse>(
            '/assessments/grade',
            request
        );
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Failed to grade assessment');
    }
}
