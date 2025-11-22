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

    console.log('currentQuestion', currentQuestion);

    return (
        <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-8 max-w-4xl">
            {/* Header */}
            <div className="mb-4 sm:mb-6">
                <div className="flex items-start sm:items-center justify-between mb-3 sm:mb-4 gap-2">
                    <div className="flex-1 min-w-0">
                        <h1 className="text-lg sm:text-2xl font-bold text-primary truncate">{assessment.manual.title}</h1>
                        <p className="text-xs sm:text-sm text-gray-600 mt-1">
                            Pregunta {currentQuestionIndex + 1} de {assessment.totalQuestions}
                        </p>
                    </div>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowExitDialog(true)}
                        className="border-secondary text-secondary hover:bg-secondary hover:text-white shrink-0"
                    >
                        <X className="h-4 w-4 sm:mr-2" />
                        <span className="hidden sm:inline">Salir</span>
                    </Button>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2">
                    <div className="flex justify-between text-xs sm:text-sm text-gray-600">
                        <span>Progreso</span>
                        <span className="text-right">{answeredCount}/{assessment.totalQuestions}</span>
                    </div>
                    <Progress value={progressPercentage} className="h-2 bg-gray-200 [&>div]:bg-success" />
                </div>
            </div>

            {/* Question Card */}
            <Card className="mb-4 sm:mb-6">
                <CardHeader className="p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row items-start gap-2 sm:gap-3">
                        <Badge variant="secondary" className="shrink-0 bg-primary text-white hover:bg-primary/90 text-xs">
                            Pregunta {currentQuestionIndex + 1}
                        </Badge>
                        <div className="flex-1 w-full">
                            <CardTitle className="text-base sm:text-lg font-medium leading-relaxed text-primary">
                                <RichTextDisplay content={currentQuestion.text || currentQuestion.questionText} />
                            </CardTitle>
                            <p className="text-xs sm:text-sm text-gray-500 mt-2">
                                Capítulo: {currentQuestion.chapterTitle}
                            </p>
                        </div>
                    </div>
                </CardHeader>

                <CardContent className="p-4 sm:p-6">
                    <div className="space-y-2 sm:space-y-3">
                        {currentQuestion.answers.map((answer, index) => {
                            const isSelected = answers[currentQuestion.id] === answer.id;
                            return (
                                <button
                                    key={answer.id}
                                    onClick={() => handleAnswerSelect(answer.id)}
                                    className={`
                                        w-full p-3 sm:p-4 rounded-lg border-2 text-left transition-all active:scale-[0.98]
                                        ${isSelected
                                            ? 'border-primary bg-gray-50 ring-2 ring-primary ring-offset-1 sm:ring-offset-2'
                                            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                                        }
                                    `}
                                >
                                    <div className="flex items-start gap-2 sm:gap-3">
                                        <div className={`
                                            flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full shrink-0 font-semibold text-sm
                                            ${isSelected
                                                ? 'bg-primary text-white'
                                                : 'bg-gray-100 text-primary'
                                            }
                                        `}>
                                            {getAnswerLetter(index)}
                                        </div>
                                        <div className="flex-1 text-primary text-sm sm:text-base">
                                            <RichTextDisplay content={answer.text} />
                                        </div>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </CardContent>

                <CardFooter className="flex flex-col sm:flex-row justify-between gap-2 sm:gap-4 p-4 sm:p-6">
                    <Button
                        variant="outline"
                        onClick={handlePrevious}
                        disabled={isFirstQuestion}
                        className="w-full sm:w-auto border-primary text-primary hover:bg-primary hover:text-white disabled:opacity-50 text-sm sm:text-base"
                    >
                        <ChevronLeft className="h-4 w-4 mr-2" />
                        Anterior
                    </Button>

                    <Button
                        onClick={handleNext}
                        disabled={!answers[currentQuestion.id]}
                        className="w-full sm:w-auto bg-secondary hover:bg-secondary/90 text-white disabled:opacity-50 disabled:bg-gray-400 text-sm sm:text-base"
                    >
                        {isLastQuestion ? 'Finalizar Examen' : 'Siguiente'}
                        {!isLastQuestion && <ChevronRight className="h-4 w-4 ml-2" />}
                    </Button>
                </CardFooter>
            </Card>

            {/* Question Grid Overview */}
            <Card>
                <CardHeader className="p-4 sm:p-6">
                    <CardTitle className="text-sm sm:text-base text-primary">Resumen de Respuestas</CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                    <div className="grid grid-cols-5 xs:grid-cols-6 sm:grid-cols-8 md:grid-cols-10 gap-1.5 sm:gap-2">
                        {assessment.questions.map((question, index) => {
                            const isAnswered = !!answers[question.id];
                            const isCurrent = index === currentQuestionIndex;
                            return (
                                <button
                                    key={question.id}
                                    onClick={() => setCurrentQuestionIndex(index)}
                                    className={`
                                        aspect-square rounded-md text-xs sm:text-sm font-medium transition-all active:scale-95
                                        ${isCurrent
                                            ? 'bg-secondary text-white ring-1 sm:ring-2 ring-secondary ring-offset-1 sm:ring-offset-2'
                                            : isAnswered
                                                ? 'bg-success/20 text-success hover:bg-success/30 border border-success'
                                                : 'bg-white border-2 border-gray-200 text-gray-400 hover:border-gray-300'
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
                <DialogContent className="w-[calc(100vw-2rem)] max-w-md mx-auto">
                    <DialogHeader>
                        <DialogTitle className="text-primary text-base sm:text-lg">¿Enviar Examen?</DialogTitle>
                        <DialogDescription className="text-sm">
                            Has respondido {answeredCount} de {assessment.totalQuestions} preguntas.
                            {answeredCount < assessment.totalQuestions && (
                                <span className="flex items-center gap-2 mt-2 text-warning text-xs sm:text-sm">
                                    <AlertCircle className="h-4 w-4 shrink-0" />
                                    <span>Tienes {assessment.totalQuestions - answeredCount} pregunta(s) sin responder.</span>
                                </span>
                            )}
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="flex-col sm:flex-row gap-2 sm:gap-0">
                        <Button variant="outline" onClick={() => setShowSubmitDialog(false)} className="w-full sm:w-auto border-primary text-primary hover:bg-primary hover:text-white">
                            Revisar Respuestas
                        </Button>
                        <Button onClick={handleSubmit} className="w-full sm:w-auto bg-secondary hover:bg-secondary/90 text-white">
                            Enviar Examen
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Exit Confirmation Dialog */}
            <Dialog open={showExitDialog} onOpenChange={setShowExitDialog}>
                <DialogContent className="w-[calc(100vw-2rem)] max-w-md mx-auto">
                    <DialogHeader>
                        <DialogTitle className="text-primary text-base sm:text-lg">¿Salir del Examen?</DialogTitle>
                        <DialogDescription className="text-sm">
                            Si sales ahora, perderás todo tu progreso. Esta acción no se puede deshacer.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="flex-col sm:flex-row gap-2 sm:gap-0">
                        <Button variant="outline" onClick={() => setShowExitDialog(false)} className="w-full sm:w-auto border-primary text-primary hover:bg-primary hover:text-white">
                            Continuar Examen
                        </Button>
                        <Button onClick={handleExit} className="w-full sm:w-auto bg-secondary hover:bg-secondary/90 text-white">
                            Salir
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
