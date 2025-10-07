import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProductCard = ({
    product,
    onEdit,
    onDuplicate,
    onArchive,
    onQuickEdit,
    isSelected,
    onSelect
}) => {
    const [isHovered, setIsHovered] = useState(false);

    const getStockStatus = (stock) => {
        if (stock === 0) return { status: 'out-of-stock', color: 'text-error', bg: 'bg-error/10' };
        if (stock <= 10) return { status: 'low-stock', color: 'text-warning', bg: 'bg-warning/10' };
        return { status: 'in-stock', color: 'text-success', bg: 'bg-success/10' };
    };

    const stockInfo = getStockStatus(product?.stock);

    return (
        <div
            className={`bg-card border border-border rounded-lg overflow-hidden transition-smooth hover:shadow-elevation group ${isSelected ? 'ring-2 ring-primary' : ''
                }`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Product Image */}
            <div className="relative overflow-hidden aspect-square bg-muted">
                <Image
                    src={product?.image}
                    alt={product?.name}
                    className="object-cover w-full h-full transition-smooth group-hover:scale-105"
                />

                {/* Selection Checkbox */}
                <div className="absolute top-2 left-2">
                    <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={(e) => onSelect(product?.id, e?.target?.checked)}
                        className="w-4 h-4 bg-white rounded text-primary border-border focus:ring-primary focus:ring-2"
                    />
                </div>

                {/* Quick Actions Overlay */}
                {isHovered && (
                    <div className="absolute inset-0 flex items-center justify-center space-x-2 bg-black/40 animate-fade-in">
                        <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => onEdit(product)}
                            className="bg-white/90 hover:bg-white"
                        >
                            <Icon name="Edit" size={16} />
                        </Button>
                        <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => onDuplicate(product)}
                            className="bg-white/90 hover:bg-white"
                        >
                            <Icon name="Copy" size={16} />
                        </Button>
                        <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => onArchive(product)}
                            className="bg-white/90 hover:bg-white"
                        >
                            <Icon name="Archive" size={16} />
                        </Button>
                    </div>
                )}

                {/* Status Badges */}
                <div className="absolute flex flex-col space-y-1 top-2 right-2">
                    {product?.isNew && (
                        <span className="px-2 py-1 text-xs font-medium rounded bg-primary text-primary-foreground">
                            New
                        </span>
                    )}
                    {product?.isFeatured && (
                        <span className="px-2 py-1 text-xs font-medium rounded bg-secondary text-secondary-foreground">
                            Featured
                        </span>
                    )}
                    {product?.onSale && (
                        <span className="px-2 py-1 text-xs font-medium rounded bg-accent text-accent-foreground">
                            Sale
                        </span>
                    )}
                </div>
            </div>
            {/* Product Info */}
            <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                    <h3 className="flex-1 mr-2 font-medium truncate text-foreground">
                        {product?.name}
                    </h3>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onQuickEdit(product)}
                        className="flex-shrink-0 w-6 h-6"
                    >
                        <Icon name="MoreVertical" size={14} />
                    </Button>
                </div>

                <p className="mb-3 text-sm text-muted-foreground line-clamp-2">
                    {product?.description}
                </p>

                {/* Price and Stock */}
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                        <span className="font-semibold text-foreground">
                            ${product?.price?.toFixed(2)}
                        </span>
                        {product?.originalPrice && product?.originalPrice > product?.price && (
                            <span className="text-sm line-through text-muted-foreground">
                                ${product?.originalPrice?.toFixed(2)}
                            </span>
                        )}
                    </div>
                    <div className={`px-2 py-1 rounded text-xs font-medium ${stockInfo?.bg} ${stockInfo?.color}`}>
                        {product?.stock} in stock
                    </div>
                </div>

                {/* Category and SKU */}
                <div className="flex items-center justify-between mb-3 text-xs text-muted-foreground">
                    <span>{product?.category}</span>
                    <span>SKU: {product?.sku}</span>
                </div>

                {/* Variants */}
                {product?.variants && product?.variants?.length > 0 && (
                    <div className="mb-3">
                        <p className="mb-1 text-xs text-muted-foreground">
                            {product?.variants?.length} variant{product?.variants?.length > 1 ? 's' : ''}
                        </p>
                        <div className="flex space-x-1">
                            {product?.variants?.slice(0, 4)?.map((variant, index) => (
                                <div
                                    key={index}
                                    className="w-4 h-4 border rounded border-border"
                                    style={{ backgroundColor: variant?.color || '#ccc' }}
                                    title={variant?.name}
                                />
                            ))}
                            {product?.variants?.length > 4 && (
                                <span className="text-xs text-muted-foreground">
                                    +{product?.variants?.length - 4}
                                </span>
                            )}
                        </div>
                    </div>
                )}

                {/* Action Buttons */}
                <div className="flex space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onEdit(product)}
                        className="flex-1"
                    >
                        <Icon name="Edit" size={14} className="mr-1" />
                        Edit
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDuplicate(product)}
                    >
                        <Icon name="Copy" size={14} />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;


