'use client';

import { useState, useEffect } from 'react';
import { IManual } from '@/lib/definitions';
import { fetchManuals } from '@/lib/api/assessment';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { BookOpen, AlertCircle } from 'lucide-react';

interface ManualSelectionViewProps {
    onSelectManual: (manualId: string) => void;
}

export function ManualSelectionView({ onSelectManual }: ManualSelectionViewProps) {
    const [manuals, setManuals] = useState<IManual[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        loadManuals();
    }, []);

    const loadManuals = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await fetchManuals();
            console.log('data', data);
            setManuals(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to load manuals');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-8 text-slate-900">Tomar una Evaluación</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3].map((i) => (
                        <Card key={i} className="flex flex-col">
                            <CardHeader>
                                <Skeleton className="h-6 w-3/4 mb-2" />
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-2/3" />
                            </CardHeader>
                            <CardContent className="flex-1">
                                <Skeleton className="h-4 w-1/2" />
                            </CardContent>
                            <CardFooter>
                                <Skeleton className="h-10 w-full" />
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-8 text-slate-900">Tomar una Evaluación</h1>
                <Card className="border-red-200 bg-red-50">
                    <CardHeader>
                        <CardTitle className="text-red-900 flex items-center gap-2">
                            <AlertCircle className="h-5 w-5" />
                            Error al Cargar Manuales
                        </CardTitle>
                        <CardDescription className="text-red-700">{error}</CardDescription>
                    </CardHeader>
                    <CardFooter>
                        <Button onClick={loadManuals} variant="destructive">
                            Reintentar
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        );
    }

    if (manuals.length === 0) {
        return (
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-8 text-slate-900">Tomar una Evaluación</h1>
                <Card>
                    <CardHeader>
                        <CardTitle>No hay manuales disponibles</CardTitle>
                        <CardDescription>
                            Actualmente no hay manuales publicados para realizar evaluaciones.
                        </CardDescription>
                    </CardHeader>
                </Card>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 mb-2">Tomar una Evaluación</h1>
                <p className="text-slate-600">
                    Selecciona un manual para comenzar tu evaluación de 40 preguntas
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {manuals.map((manual) => (
                    <Card key={manual.id} className="flex flex-col hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <div className="flex items-start gap-3">
                                <div className="p-2 bg-slate-100 rounded-lg">
                                    <BookOpen className="h-6 w-6 text-slate-900" />
                                </div>
                                <div className="flex-1">
                                    <CardTitle className="text-xl mb-1">{manual.title}</CardTitle>
                                    {manual.description && (
                                        <CardDescription className="line-clamp-2">
                                            {manual.description}
                                        </CardDescription>
                                    )}
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="flex-1">
                            {manual.chapterCount !== undefined && (
                                <p className="text-sm text-slate-600">
                                    {manual.chapterCount} {manual.chapterCount === 1 ? 'capítulo' : 'capítulos'}
                                </p>
                            )}
                        </CardContent>
                        <CardFooter>
                            <Button
                                onClick={() => onSelectManual(manual.id)}
                                className="w-full"
                            >
                                Comenzar Evaluación
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}
