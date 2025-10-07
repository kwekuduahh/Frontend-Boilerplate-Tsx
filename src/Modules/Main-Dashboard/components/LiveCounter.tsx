import React, { useState, useEffect } from 'react';
import { DynamicIcon } from 'lucide-react/dynamic';

interface LiveCounterProps {
    title: string;
    currentValue: number;
    target: number;
    unit: string;
    updateInterval: number;
    isLive: boolean;
}

const LiveCounter: React.FC<LiveCounterProps> = ({
    title = "Live Sales",
    currentValue = 0,
    target = 1000,
    unit = "$",
    updateInterval = 5000,
    isLive = true
}) => {
    const [value, setValue] = useState(currentValue);
    const [isAnimating, setIsAnimating] = useState(false);
    const [lastUpdate, setLastUpdate] = useState(new Date());

    useEffect(() => {
        if (!isLive) return;

        const interval = setInterval(() => {
            // Simulate live updates with random increments
            const increment = Math.floor(Math.random() * 50) + 10;
            setValue(prev => {
                const newValue = prev + increment;
                setIsAnimating(true);
                setLastUpdate(new Date());

                setTimeout(() => setIsAnimating(false), 500);
                return newValue;
            });
        }, updateInterval);

        return () => clearInterval(interval);
    }, [isLive, updateInterval]);

    const progress = Math.min((value / target) * 100, 100);
    const remaining = Math.max(target - value, 0);

    const formatValue = (val: number) => {
        if (unit === "$") {
            return `$${val?.toLocaleString()}`;
        }
        return `${val?.toLocaleString()}${unit}`;
    };

    const formatTime = (date: Date) => {
        return date?.toLocaleTimeString('en-US', {
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    };

    return (
        <div className="p-6 border rounded-lg bg-card border-border shadow-card">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-success to-green-600">
                        <DynamicIcon name="trending-up" size={20} color="white" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-foreground">{title}</h3>
                        <p className="text-xs text-muted-foreground">
                            Target: {formatValue(target)}
                        </p>
                    </div>
                </div>

                <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${isLive ? 'bg-success animate-pulse' : 'bg-muted-foreground'}`}></div>
                    <span className="text-xs text-muted-foreground">
                        {isLive ? 'Live' : 'Paused'}
                    </span>
                </div>
            </div>
            <div className="space-y-4">
                {/* Current Value */}
                <div className="text-center">
                    <div className={`text-3xl font-bold text-foreground transition-smooth ${isAnimating ? 'scale-110 text-success' : ''
                        }`}>
                        {formatValue(value)}
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Current total
                    </p>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-medium text-foreground">{progress?.toFixed(1)}%</span>
                    </div>
                    <div className="w-full h-3 overflow-hidden rounded-full bg-muted">
                        <div
                            className="relative h-full transition-all duration-1000 ease-out rounded-full bg-gradient-to-r from-success to-green-600"
                            style={{ width: `${progress}%` }}
                        >
                            <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                        </div>
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                        <span>0</span>
                        <span>{formatValue(target)}</span>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                    <div className="text-center">
                        <div className="text-lg font-semibold text-foreground">
                            {formatValue(remaining)}
                        </div>
                        <p className="text-xs text-muted-foreground">Remaining</p>
                    </div>
                    <div className="text-center">
                        <div className="text-lg font-semibold text-foreground">
                            {Math.round((value / target) * 100)}%
                        </div>
                        <p className="text-xs text-muted-foreground">Complete</p>
                    </div>
                </div>

                {/* Last Update */}
                <div className="pt-2 border-t border-border">
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>Last updated</span>
                        <span className="font-mono">{formatTime(lastUpdate)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LiveCounter;


