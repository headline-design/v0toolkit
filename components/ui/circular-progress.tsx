"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface CircularProgressProps {
    value: number;
    renderLabel?: (progress: number) => number | string;
    size?: number;
    strokeWidth?: number;
    circleStrokeWidth?: number;
    progressStrokeWidth?: number;
    shape?: "square" | "round";
    className?: string;
    progressClassName?: string;
    labelClassName?: string;
    showLabel?: boolean;
}

const CircularProgress = ({
    value,
    renderLabel,
    className,
    progressClassName,
    labelClassName,
    showLabel,
    shape = "round",
    size = 100,
    strokeWidth,
    circleStrokeWidth = 10,
    progressStrokeWidth = 10,
}: CircularProgressProps) => {
    // MUCH BIGGER circles - but account for stroke width to prevent clipping
    const actualStrokeWidth = strokeWidth ?? Math.max(circleStrokeWidth, progressStrokeWidth);
    const radius = (size / 2) - (actualStrokeWidth / 2) - 1; // Subtract half stroke width plus buffer
    const circumference = Math.ceil(2 * Math.PI * radius);
    const percentage = Math.ceil(circumference * ((100 - value) / 100));
    const viewBox = `0 0 ${size} ${size}`;

    return (
        <div className="relative">
            <svg
                width={size}
                height={size}
                viewBox={viewBox}
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                style={{ transform: "rotate(-90deg)" }}
                className="relative"
            >
                {/* Base Circle */}
                <circle
                    r={radius}
                    cx={size / 2}
                    cy={size / 2}
                    fill="transparent"
                    strokeWidth={strokeWidth ?? circleStrokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset="0"
                    className={cn("stroke-primary/25", className)}
                />
                {/* Progress */}
                <circle
                    r={radius}
                    cx={size / 2}
                    cy={size / 2}
                    strokeWidth={strokeWidth ?? progressStrokeWidth}
                    strokeLinecap={shape}
                    strokeDashoffset={percentage}
                    fill="transparent"
                    strokeDasharray={circumference}
                    className={cn("stroke-primary", progressClassName)}
                />
            </svg>
            {showLabel && (
                <div
                    className={cn(
                        "absolute inset-0 flex items-center justify-center font-bold",
                        labelClassName
                    )}
                >
                    {renderLabel ? renderLabel(value) : value}
                </div>
            )}
        </div>
    );
};

export function ProgressChip({
    progress,
    step,
    steps,
    size = 50,
    strokeWidth = 5,
}: {
    progress: number[];
    size?: number;
    strokeWidth?: number;
    step?: number;
    steps?: number;
}) {

    const [isExpanded, setIsExpanded] = React.useState(false);


    return (
        <>



            {/* Expandable Progress Chip for Mobile */}
            <div className="flex items-center justify-center">
                <div
                    className={cn(
                        "flex items-center rounded-full cursor-pointer transition-all duration-300 ease-in-out shadow-sm",
                        isExpanded ? "gap-2 px-3 py-2" : "gap-0 px-1 py-1",
                        "dark:bg-purple-950 border dark:border-purple-700/50 dark:hover:bg-purple-950/90 bg-purple-50  border-purple-200 hover:bg-purple-100"
                    )}
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    <CircularProgress
                        value={progress[0]}
                        size={48}
                        strokeWidth={4}
                        showLabel
                        labelClassName={cn(
                            "text-xs font-bold",
                            "dark:text-purple-300 text-purple-700"
                        )}
                        renderLabel={(progress) => progress === 100 ? "100" : `${progress}%`}
                        className={"dark:stroke-purple-600/30 stroke-purple-500/25"}
                        progressClassName={"dark:stroke-purple-400 stroke-purple-600"}
                    />
                    <div
                        className={cn(
                            "text-left transition-all duration-300 ease-in-out overflow-hidden",
                            isExpanded ? "max-w-xs opacity-100" : "max-w-0 opacity-0"
                        )}
                    >
                        <div className={cn(
                            "text-sm font-medium whitespace-nowrap dark:text-purple-300 text-purple-700"
                        )}>
                            Progress
                        </div>
                        <div className={cn(
                            "text-xs whitespace-nowrap dark:text-purple-400 text-purple-600"
                        )}>
                            {step} of {steps} fields
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
