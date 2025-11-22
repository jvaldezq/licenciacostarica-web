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
        return passed ? 'text-success' : 'text-error';
    };

    const getGradeBgColor = (passed: boolean) => {
        return passed ? 'bg-success/10 border-success' : 'bg-error/10 border-error';
    };

    const getAnswerLetter = (answers: typeof results.results[0], answerId: string) => {
        const question = results.results.find(r => r.correctAnswerId === answerId || r.selectedAnswerId === answerId || r.userAnswerId === answerId);
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
                                <div className="p-4 bg-success/20 rounded-full">
                                    <Award className="h-16 w-16 text-success" />
                                </div>
                            ) : (
                                <div className="p-4 bg-error/20 rounded-full">
                                    <TrendingUp className="h-16 w-16 text-error" />
                                </div>
                            )}
                        </div>
                        <CardTitle className={`text-4xl font-bold mb-2 ${getGradeColor(results.score.passed)}`}>
                            {results.score.percentage.toFixed(1)}%
                        </CardTitle>
                        <CardDescription className="text-lg font-semibold text-primary">
                            {results.score.correct} de {results.score.total} correctas
                        </CardDescription>
                        <Badge
                            className={`mt-3 text-base px-4 py-1 ${results.score.passed ? 'bg-success text-white hover:bg-success/90' : 'bg-error text-white hover:bg-error/90'}`}
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
                        <CardTitle className="text-sm font-medium text-gray-600">
                            Respuestas Correctas
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="h-5 w-5 text-success" />
                            <span className="text-2xl font-bold text-primary">
                                {results.score.correct}
                            </span>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium text-gray-600">
                            Respuestas Incorrectas
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-2">
                            <XCircle className="h-5 w-5 text-error" />
                            <span className="text-2xl font-bold text-primary">
                                {results.score.incorrect}
                            </span>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium text-gray-600">
                            Precisión
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            <span className="text-2xl font-bold text-primary">
                                {results.score.percentage.toFixed(1)}%
                            </span>
                            <Progress value={results.score.percentage} className="h-2 bg-gray-200 [&>div]:bg-success" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Study Recommendations */}
            {results.studyRecommendations.shouldReview && results.studyRecommendations.weakChapters.length > 0 && (
                <Card className="mb-8 border-warning bg-warning-yellow">
                    <CardHeader>
                        <div className="flex items-start gap-3">
                            <BookOpen className="h-6 w-6 text-warning mt-1" />
                            <div>
                                <CardTitle className="text-primary">Áreas para Repasar</CardTitle>
                                <CardDescription className="text-gray-700 mt-2">
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
                                    className="p-4 bg-white rounded-lg border border-warning"
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <h4 className="font-semibold text-primary">
                                            {chapter.chapterTitle}
                                        </h4>
                                        <Badge className="bg-warning text-white hover:bg-warning/90">
                                            {(chapter.accuracyPercentage || chapter.accuracy || 0).toFixed(0)}% precisión
                                        </Badge>
                                    </div>
                                    <p className="text-sm text-gray-600">
                                        {chapter.incorrectCount} de {chapter.totalQuestionsFromChapter || chapter.totalCount || 0} incorrectas
                                    </p>
                                    <Progress
                                        value={chapter.accuracyPercentage || chapter.accuracy || 0}
                                        className="h-1.5 mt-2 bg-gray-200 [&>div]:bg-warning"
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
                        <CardTitle className="text-primary">Resultados Detallados</CardTitle>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setShowDetails(!showDetails)}
                            className="text-primary hover:bg-primary/10"
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
                                size="sm"
                                onClick={() => setFilter('all')}
                                className={filter === 'all' ? 'bg-primary text-white hover:bg-primary/90' : 'border-primary text-primary hover:bg-primary hover:text-white'}
                                variant={filter === 'all' ? 'default' : 'outline'}
                            >
                                Todas ({results.results.length})
                            </Button>
                            <Button
                                size="sm"
                                onClick={() => setFilter('incorrect')}
                                className={filter === 'incorrect' ? 'bg-secondary text-white hover:bg-secondary/90' : 'border-secondary text-secondary hover:bg-secondary hover:text-white'}
                                variant={filter === 'incorrect' ? 'default' : 'outline'}
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
                                            ? 'border-success bg-success/5'
                                            : 'border-error bg-error/5'
                                    }`}
                                >
                                    <div className="flex items-start gap-3 mb-3">
                                        {result.isCorrect ? (
                                            <CheckCircle2 className="h-5 w-5 text-success mt-0.5 shrink-0" />
                                        ) : (
                                            <XCircle className="h-5 w-5 text-error mt-0.5 shrink-0" />
                                        )}
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <Badge variant="outline" className="text-xs border-primary text-primary">
                                                    Pregunta {index + 1}
                                                </Badge>
                                                <Badge className="text-xs bg-primary text-white hover:bg-primary/90">
                                                    {result.chapterTitle}
                                                </Badge>
                                            </div>
                                            <div className="font-medium text-primary mb-3">
                                                <RichTextDisplay content={result.questionText} />
                                            </div>

                                            <div className="space-y-2">
                                                {!result.isCorrect && (
                                                    <div className="p-3 bg-error/10 rounded-md border border-error">
                                                        <p className="text-sm font-medium text-error mb-1">
                                                            Tu respuesta:
                                                        </p>
                                                        <div className="text-sm text-primary">
                                                            <RichTextDisplay content={result.selectedAnswerText || result.userAnswerText || ''} />
                                                        </div>
                                                    </div>
                                                )}
                                                <div className={`p-3 rounded-md border ${
                                                    result.isCorrect
                                                        ? 'bg-success/10 border-success'
                                                        : 'bg-white border-success'
                                                }`}>
                                                    <p className="text-sm font-medium text-success mb-1">
                                                        Respuesta correcta:
                                                    </p>
                                                    <div className="text-sm text-primary">
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
                    className="gap-2 bg-secondary hover:bg-secondary/90 text-white"
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
                        className="gap-2 border-primary text-primary hover:bg-primary hover:text-white"
                    >
                        <BookOpen className="h-5 w-5" />
                        Revisar Respuestas Incorrectas
                    </Button>
                )}
            </div>
        </div>
    );
}
