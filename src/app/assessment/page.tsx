'use client';

import { useState } from 'react';
import { GenerateAssessmentResponse, GradeAssessmentResponse } from '@/lib/definitions';
import { generateAssessment, gradeAssessment } from '@/lib/api/assessment';
import { ManualSelectionView } from '@/components/assessment/ManualSelectionView';
import { TestTakingView } from '@/components/assessment/TestTakingView';
import { ResultsView } from '@/components/assessment/ResultsView';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, AlertCircle } from 'lucide-react';

type ViewState = 'selection' | 'generating' | 'testing' | 'grading' | 'results';

interface AssessmentState {
    view: ViewState;
    selectedManualId: string | null;
    assessment: GenerateAssessmentResponse | null;
    results: GradeAssessmentResponse | null;
    error: string | null;
}

export default function AssessmentPage() {
    const [state, setState] = useState<AssessmentState>({
        view: 'selection',
        selectedManualId: null,
        assessment: null,
        results: null,
        error: null
    });

    const handleSelectManual = async (manualId: string) => {
        setState(prev => ({
            ...prev,
            view: 'generating',
            selectedManualId: manualId,
            error: null
        }));

        try {
            const assessment = await generateAssessment(manualId, 40);
            setState(prev => ({
                ...prev,
                view: 'testing',
                assessment
            }));
        } catch (error) {
            setState(prev => ({
                ...prev,
                view: 'selection',
                error: error instanceof Error ? error.message : 'Failed to generate assessment'
            }));
        }
    };

    const handleSubmitTest = async (answers: Record<string, string>) => {
        if (!state.assessment) return;

        setState(prev => ({ ...prev, view: 'grading', error: null }));

        try {
            // Convert answers object to array format
            const answersArray = Object.entries(answers).map(([questionId, answerId]) => ({
                questionId,
                answerId
            }));

            const results = await gradeAssessment({
                assessmentId: state.assessment.assessmentId,
                manualId: state.assessment.manual.id,
                answers: answersArray
            });

            setState(prev => ({
                ...prev,
                view: 'results',
                results
            }));
        } catch (error) {
            setState(prev => ({
                ...prev,
                view: 'testing',
                error: error instanceof Error ? error.message : 'Failed to grade assessment'
            }));
        }
    };

    const handleExitTest = () => {
        setState({
            view: 'selection',
            selectedManualId: null,
            assessment: null,
            results: null,
            error: null
        });
    };

    const handleTakeNewAssessment = () => {
        setState({
            view: 'selection',
            selectedManualId: null,
            assessment: null,
            results: null,
            error: null
        });
    };

    const handleRetry = () => {
        if (state.selectedManualId) {
            handleSelectManual(state.selectedManualId);
        }
    };

    // Error Display
    if (state.error && state.view === 'selection') {
        return (
            <div className="container mx-auto px-4 py-8">
                <Card className="border-error bg-error/10 max-w-2xl mx-auto">
                    <CardHeader>
                        <CardTitle className="text-error flex items-center gap-2">
                            <AlertCircle className="h-5 w-5" />
                            Error
                        </CardTitle>
                        <CardDescription className="text-primary">
                            {state.error}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex gap-3">
                            <Button onClick={handleRetry} className="bg-secondary hover:bg-secondary/90 text-white">
                                Reintentar
                            </Button>
                            <Button onClick={() => setState(prev => ({ ...prev, error: null }))} variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                                Volver
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    // Generating Assessment Loading State
    if (state.view === 'generating') {
        return (
            <div className="container mx-auto px-4 py-8">
                <Card className="max-w-2xl mx-auto">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3 text-primary">
                            <Loader2 className="h-6 w-6 animate-spin text-secondary" />
                            Generando tu Evaluación
                        </CardTitle>
                        <CardDescription>
                            Estamos seleccionando 40 preguntas aleatorias para tu examen...
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div className="h-full bg-secondary animate-pulse" style={{ width: '60%' }} />
                            </div>
                            <p className="text-sm text-gray-600 text-center">
                                Esto solo tomará unos segundos
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    // Grading Assessment Loading State
    if (state.view === 'grading') {
        return (
            <div className="container mx-auto px-4 py-8">
                <Card className="max-w-2xl mx-auto">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3 text-primary">
                            <Loader2 className="h-6 w-6 animate-spin text-secondary" />
                            Calificando tu Examen
                        </CardTitle>
                        <CardDescription>
                            Estamos revisando tus respuestas y generando recomendaciones de estudio...
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div className="h-full bg-secondary animate-pulse" style={{ width: '80%' }} />
                            </div>
                            <p className="text-sm text-gray-600 text-center">
                                Casi listo...
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    // Manual Selection View
    if (state.view === 'selection') {
        return <ManualSelectionView onSelectManual={handleSelectManual} />;
    }

    // Test Taking View
    if (state.view === 'testing' && state.assessment) {
        return (
            <>
                {state.error && (
                    <div className="container mx-auto px-4 pt-8 max-w-4xl">
                        <Alert variant="destructive" className="mb-4 border-error bg-error/10">
                            <AlertCircle className="h-4 w-4 text-error" />
                            <AlertTitle className="text-error">Error al Enviar</AlertTitle>
                            <AlertDescription className="text-primary">
                                {state.error}
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setState(prev => ({ ...prev, error: null }))}
                                    className="ml-4 border-error text-error hover:bg-error hover:text-white"
                                >
                                    Cerrar
                                </Button>
                            </AlertDescription>
                        </Alert>
                    </div>
                )}
                <TestTakingView
                    assessment={state.assessment}
                    onSubmit={handleSubmitTest}
                    onExit={handleExitTest}
                />
            </>
        );
    }

    // Results View
    if (state.view === 'results' && state.results) {
        return (
            <ResultsView
                results={state.results}
                onTakeNewAssessment={handleTakeNewAssessment}
            />
        );
    }

    // Fallback
    return null;
}
