'use client';

import { useState } from 'react';
import { GradeAssessmentResponse } from '@/lib/definitions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { RichTextDisplay } from './RichTextDisplay';
import {
    CheckCircle2,
    XCircle,
    BookOpen,
    RotateCcw,
    ChevronDown,
    ChevronUp,
    Award,
    TrendingUp
} from 'lucide-react';

interface ResultsViewProps {
    results: GradeAssessmentResponse;
    onTakeNewAssessment: () => void;
}

type FilterType = 'all' | 'incorrect';

export function ResultsView({ results, onTakeNewAssessment }: ResultsViewProps) {
    const [showDetails, setShowDetails] = useState(false);
    const [filter, setFilter] = useState<FilterType>('all');

    const filteredResults = filter === 'incorrect'
        ? results.results.filter(r => !r.isCorrect)
        : results.results;

    const getGradeColor = (passed: boolean) => {
        return passed ? 'text-green-600' : 'text-red-600';
    };

    const getGradeBgColor = (passed: boolean) => {
        return passed ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200';
    };

    const getAnswerLetter = (answers: typeof results.results[0], answerId: string) => {
        const question = results.results.find(r => r.correctAnswerId === answerId || r.userAnswerId === answerId);
        if (!question) return '';

        // This is a simplified version - in real implementation, you'd need the answer order
        return answerId.slice(-1).toUpperCase();
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-5xl">
            {/* Score Summary */}
            <Card className={`mb-8 ${getGradeBgColor(results.score.passed)}`}>
                <CardHeader>
                    <div className="flex flex-col items-center text-center">
                        <div className="mb-4">
                            {results.score.passed ? (
                                <div className="p-4 bg-green-100 rounded-full">
                                    <Award className="h-16 w-16 text-green-600" />
                                </div>
                            ) : (
                                <div className="p-4 bg-red-100 rounded-full">
                                    <TrendingUp className="h-16 w-16 text-red-600" />
                                </div>
                            )}
                        </div>
                        <CardTitle className={`text-4xl font-bold mb-2 ${getGradeColor(results.score.passed)}`}>
                            {results.score.percentage.toFixed(1)}%
                        </CardTitle>
                        <CardDescription className="text-lg font-semibold text-slate-900">
                            {results.score.correct} de {results.score.total} correctas
                        </CardDescription>
                        <Badge
                            variant={results.score.passed ? 'default' : 'destructive'}
                            className="mt-3 text-base px-4 py-1"
                        >
                            {results.score.passed ? '¡Aprobado!' : 'No Aprobado'} - Calificación: {results.score.grade}
                        </Badge>
                    </div>
                </CardHeader>
            </Card>

            {/* Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium text-slate-600">
                            Respuestas Correctas
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="h-5 w-5 text-green-600" />
                            <span className="text-2xl font-bold text-slate-900">
                                {results.score.correct}
                            </span>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium text-slate-600">
                            Respuestas Incorrectas
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-2">
                            <XCircle className="h-5 w-5 text-red-600" />
                            <span className="text-2xl font-bold text-slate-900">
                                {results.score.incorrect}
                            </span>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium text-slate-600">
                            Precisión
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            <span className="text-2xl font-bold text-slate-900">
                                {results.score.percentage.toFixed(1)}%
                            </span>
                            <Progress value={results.score.percentage} className="h-2" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Study Recommendations */}
            {results.studyRecommendations.shouldReview && results.studyRecommendations.weakChapters.length > 0 && (
                <Card className="mb-8 border-amber-200 bg-amber-50">
                    <CardHeader>
                        <div className="flex items-start gap-3">
                            <BookOpen className="h-6 w-6 text-amber-600 mt-1" />
                            <div>
                                <CardTitle className="text-amber-900">Áreas para Repasar</CardTitle>
                                <CardDescription className="text-amber-700 mt-2">
                                    {results.studyRecommendations.summary}
                                </CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {results.studyRecommendations.weakChapters.map((chapter) => (
                                <div
                                    key={chapter.chapterId}
                                    className="p-4 bg-white rounded-lg border border-amber-200"
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <h4 className="font-semibold text-slate-900">
                                            {chapter.chapterTitle}
                                        </h4>
                                        <Badge variant="secondary">
                                            {chapter.accuracy.toFixed(0)}% precisión
                                        </Badge>
                                    </div>
                                    <p className="text-sm text-slate-600">
                                        {chapter.incorrectCount} de {chapter.totalCount} incorrectas
                                    </p>
                                    <Progress
                                        value={chapter.accuracy}
                                        className="h-1.5 mt-2"
                                    />
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Detailed Results */}
            <Card className="mb-8">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle>Resultados Detallados</CardTitle>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setShowDetails(!showDetails)}
                        >
                            {showDetails ? (
                                <>
                                    <ChevronUp className="h-4 w-4 mr-2" />
                                    Ocultar
                                </>
                            ) : (
                                <>
                                    <ChevronDown className="h-4 w-4 mr-2" />
                                    Mostrar
                                </>
                            )}
                        </Button>
                    </div>
                </CardHeader>

                {showDetails && (
                    <CardContent>
                        <div className="flex gap-2 mb-4">
                            <Button
                                variant={filter === 'all' ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => setFilter('all')}
                            >
                                Todas ({results.results.length})
                            </Button>
                            <Button
                                variant={filter === 'incorrect' ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => setFilter('incorrect')}
                            >
                                Solo Incorrectas ({results.score.incorrect})
                            </Button>
                        </div>

                        <div className="space-y-4">
                            {filteredResults.map((result, index) => (
                                <div
                                    key={result.questionId}
                                    className={`p-4 rounded-lg border-2 ${
                                        result.isCorrect
                                            ? 'border-green-200 bg-green-50'
                                            : 'border-red-200 bg-red-50'
                                    }`}
                                >
                                    <div className="flex items-start gap-3 mb-3">
                                        {result.isCorrect ? (
                                            <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                                        ) : (
                                            <XCircle className="h-5 w-5 text-red-600 mt-0.5 shrink-0" />
                                        )}
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <Badge variant="outline" className="text-xs">
                                                    Pregunta {index + 1}
                                                </Badge>
                                                <Badge variant="secondary" className="text-xs">
                                                    {result.chapterTitle}
                                                </Badge>
                                            </div>
                                            <div className="font-medium text-slate-900 mb-3">
                                                <RichTextDisplay content={result.questionText} />
                                            </div>

                                            <div className="space-y-2">
                                                {!result.isCorrect && (
                                                    <div className="p-3 bg-red-100 rounded-md border border-red-200">
                                                        <p className="text-sm font-medium text-red-900 mb-1">
                                                            Tu respuesta:
                                                        </p>
                                                        <div className="text-sm text-red-800">
                                                            <RichTextDisplay content={result.userAnswerText} />
                                                        </div>
                                                    </div>
                                                )}
                                                <div className={`p-3 rounded-md border ${
                                                    result.isCorrect
                                                        ? 'bg-green-100 border-green-200'
                                                        : 'bg-white border-green-200'
                                                }`}>
                                                    <p className="text-sm font-medium text-green-900 mb-1">
                                                        Respuesta correcta:
                                                    </p>
                                                    <div className="text-sm text-green-800">
                                                        <RichTextDisplay content={result.correctAnswerText} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                )}
            </Card>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                    size="lg"
                    onClick={onTakeNewAssessment}
                    className="gap-2"
                >
                    <RotateCcw className="h-5 w-5" />
                    Tomar Nueva Evaluación
                </Button>
                {results.score.incorrect > 0 && !showDetails && (
                    <Button
                        size="lg"
                        variant="outline"
                        onClick={() => {
                            setShowDetails(true);
                            setFilter('incorrect');
                        }}
                        className="gap-2"
                    >
                        <BookOpen className="h-5 w-5" />
                        Revisar Respuestas Incorrectas
                    </Button>
                )}
            </div>
        </div>
    );
}
