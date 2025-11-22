'use client';

import { useState } from 'react';
import { GenerateAssessmentResponse } from '@/lib/definitions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { RichTextDisplay } from './RichTextDisplay';
import { ChevronLeft, ChevronRight, AlertCircle, X } from 'lucide-react';

interface TestTakingViewProps {
    assessment: GenerateAssessmentResponse;
    onSubmit: (answers: Record<string, string>) => void;
    onExit: () => void;
}

export function TestTakingView({ assessment, onSubmit, onExit }: TestTakingViewProps) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [showSubmitDialog, setShowSubmitDialog] = useState(false);
    const [showExitDialog, setShowExitDialog] = useState(false);

    const currentQuestion = assessment.questions[currentQuestionIndex];
    const isLastQuestion = currentQuestionIndex === assessment.questions.length - 1;
    const isFirstQuestion = currentQuestionIndex === 0;
    const answeredCount = Object.keys(answers).length;
    const progressPercentage = (answeredCount / assessment.totalQuestions) * 100;

    const handleAnswerSelect = (answerId: string) => {
        setAnswers((prev) => ({
            ...prev,
            [currentQuestion.id]: answerId
        }));
    };

    const handleNext = () => {
        if (isLastQuestion) {
            setShowSubmitDialog(true);
        } else {
            setCurrentQuestionIndex((prev) => prev + 1);
        }
    };

    const handlePrevious = () => {
        if (!isFirstQuestion) {
            setCurrentQuestionIndex((prev) => prev - 1);
        }
    };

    const handleSubmit = () => {
        setShowSubmitDialog(false);
        onSubmit(answers);
    };

    const handleExit = () => {
        setShowExitDialog(false);
        onExit();
    };

    const getAnswerLetter = (index: number) => {
        return String.fromCharCode(65 + index); // A, B, C, D
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            {/* Header */}
            <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">{assessment.manual.title}</h1>
                        <p className="text-sm text-slate-600">
                            Pregunta {currentQuestionIndex + 1} de {assessment.totalQuestions}
                        </p>
                    </div>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowExitDialog(true)}
                    >
                        <X className="h-4 w-4 mr-2" />
                        Salir
                    </Button>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2">
                    <div className="flex justify-between text-sm text-slate-600">
                        <span>Progreso</span>
                        <span>{answeredCount} de {assessment.totalQuestions} respondidas</span>
                    </div>
                    <Progress value={progressPercentage} className="h-2" />
                </div>
            </div>

            {/* Question Card */}
            <Card className="mb-6">
                <CardHeader>
                    <div className="flex items-start gap-3">
                        <Badge variant="secondary" className="shrink-0">
                            Pregunta {currentQuestionIndex + 1}
                        </Badge>
                        <div className="flex-1">
                            <CardTitle className="text-lg font-medium leading-relaxed">
                                <RichTextDisplay content={currentQuestion.questionText} />
                            </CardTitle>
                            <p className="text-sm text-slate-500 mt-2">
                                Capítulo: {currentQuestion.chapterTitle}
                            </p>
                        </div>
                    </div>
                </CardHeader>

                <CardContent>
                    <div className="space-y-3">
                        {currentQuestion.answers.map((answer, index) => {
                            const isSelected = answers[currentQuestion.id] === answer.id;
                            return (
                                <button
                                    key={answer.id}
                                    onClick={() => handleAnswerSelect(answer.id)}
                                    className={`
                                        w-full p-4 rounded-lg border-2 text-left transition-all
                                        ${isSelected
                                            ? 'border-slate-900 bg-slate-50 ring-2 ring-slate-900 ring-offset-2'
                                            : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                                        }
                                    `}
                                >
                                    <div className="flex items-start gap-3">
                                        <div className={`
                                            flex items-center justify-center w-8 h-8 rounded-full shrink-0 font-semibold
                                            ${isSelected
                                                ? 'bg-slate-900 text-white'
                                                : 'bg-slate-100 text-slate-900'
                                            }
                                        `}>
                                            {getAnswerLetter(index)}
                                        </div>
                                        <div className="flex-1 text-slate-900">
                                            <RichTextDisplay content={answer.answerText} />
                                        </div>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </CardContent>

                <CardFooter className="flex justify-between gap-4">
                    <Button
                        variant="outline"
                        onClick={handlePrevious}
                        disabled={isFirstQuestion}
                    >
                        <ChevronLeft className="h-4 w-4 mr-2" />
                        Anterior
                    </Button>

                    <Button
                        onClick={handleNext}
                        disabled={!answers[currentQuestion.id]}
                    >
                        {isLastQuestion ? 'Finalizar Examen' : 'Siguiente'}
                        {!isLastQuestion && <ChevronRight className="h-4 w-4 ml-2" />}
                    </Button>
                </CardFooter>
            </Card>

            {/* Question Grid Overview */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-base">Resumen de Respuestas</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-8 sm:grid-cols-10 gap-2">
                        {assessment.questions.map((question, index) => {
                            const isAnswered = !!answers[question.id];
                            const isCurrent = index === currentQuestionIndex;
                            return (
                                <button
                                    key={question.id}
                                    onClick={() => setCurrentQuestionIndex(index)}
                                    className={`
                                        aspect-square rounded-md text-sm font-medium transition-all
                                        ${isCurrent
                                            ? 'bg-slate-900 text-white ring-2 ring-slate-900 ring-offset-2'
                                            : isAnswered
                                                ? 'bg-slate-200 text-slate-900 hover:bg-slate-300'
                                                : 'bg-white border-2 border-slate-200 text-slate-400 hover:border-slate-300'
                                        }
                                    `}
                                >
                                    {index + 1}
                                </button>
                            );
                        })}
                    </div>
                </CardContent>
            </Card>

            {/* Submit Confirmation Dialog */}
            <Dialog open={showSubmitDialog} onOpenChange={setShowSubmitDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>¿Enviar Examen?</DialogTitle>
                        <DialogDescription>
                            Has respondido {answeredCount} de {assessment.totalQuestions} preguntas.
                            {answeredCount < assessment.totalQuestions && (
                                <span className="flex items-center gap-2 mt-2 text-amber-600">
                                    <AlertCircle className="h-4 w-4" />
                                    Tienes {assessment.totalQuestions - answeredCount} pregunta(s) sin responder.
                                </span>
                            )}
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowSubmitDialog(false)}>
                            Revisar Respuestas
                        </Button>
                        <Button onClick={handleSubmit}>
                            Enviar Examen
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Exit Confirmation Dialog */}
            <Dialog open={showExitDialog} onOpenChange={setShowExitDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>¿Salir del Examen?</DialogTitle>
                        <DialogDescription>
                            Si sales ahora, perderás todo tu progreso. Esta acción no se puede deshacer.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowExitDialog(false)}>
                            Continuar Examen
                        </Button>
                        <Button variant="destructive" onClick={handleExit}>
                            Salir
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
