import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

interface ProductEditorProps {
    product: any;
    isOpen: boolean;
    onClose: () => void;
    onSave: (product: any) => void;
}

const ProductEditor: React.FC<ProductEditorProps> = ({ product, isOpen, onClose, onSave }) => {
    const [formData, setFormData] = useState<any>({
        name: product?.name || '',
        description: product?.description || '',
        price: product?.price || '',
        originalPrice: product?.originalPrice || '',
        sku: product?.sku || '',
        category: product?.category || '',
        stock: product?.stock || '',
        images: product?.images || [product?.image || ''],
        variants: product?.variants || [],
        isNew: product?.isNew || false,
        isFeatured: product?.isFeatured || false,
        onSale: product?.onSale || false,
        seoTitle: product?.seoTitle || '',
        seoDescription: product?.seoDescription || '',
        tags: product?.tags?.join(', ') || ''
    });

    const [activeTab, setActiveTab] = useState<'basic' | 'images' | 'variants' | 'seo'>('basic');
    const [draggedImage, setDraggedImage] = useState<number | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const categoryOptions = [
        { value: 'electronics', label: 'Electronics' },
        { value: 'clothing', label: 'Clothing' },
        { value: 'home-garden', label: 'Home & Garden' },
        { value: 'sports', label: 'Sports & Outdoors' },
        { value: 'books', label: 'Books' },
        { value: 'toys', label: 'Toys & Games' }
    ];

    const tabs = [
        { id: 'basic', label: 'Basic Info', icon: 'Info' },
        { id: 'images', label: 'Images', icon: 'Image' },
        { id: 'variants', label: 'Variants', icon: 'Layers' },
        { id: 'seo', label: 'SEO', icon: 'Search' }
    ];

    const handleInputChange = (field: string, value: any) => {
        setFormData((prev: any) => ({ ...prev, [field]: value }));
    };

    const handleImageUpload = (files: FileList | null) => {
        if (!files) return;
        const newImages = Array.from(files).map(file => URL.createObjectURL(file));
        setFormData((prev: any) => ({ ...prev, images: [...prev?.images, ...newImages] }));
    };

    const removeImage = (index: number) => {
        setFormData((prev: any) => ({ ...prev, images: prev?.images?.filter((_: any, i: number) => i !== index) }));
    };

    const addVariant = () => {
        const newVariant = { id: Date.now(), name: '', sku: '', price: formData?.price, stock: 0, attributes: { size: '', color: '' } };
        setFormData((prev: any) => ({ ...prev, variants: [...prev?.variants, newVariant] }));
    };

    const updateVariant = (index: number, field: string, value: any) => {
        setFormData((prev: any) => ({ ...prev, variants: prev?.variants?.map((variant: any, i: number) => (i === index ? { ...variant, [field]: value } : variant)) }));
    };

    const removeVariant = (index: number) => {
        setFormData((prev: any) => ({ ...prev, variants: prev?.variants?.filter((_: any, i: number) => i !== index) }));
    };

    const handleSave = () => {
        const updatedProduct = { ...product, ...formData, tags: formData?.tags?.split(',')?.map((tag: string) => tag?.trim())?.filter((tag: string) => tag) };
        onSave(updatedProduct);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center p-4 bg-black/50 z-1200">
            <div className="bg-card border border-border rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden">
                <div className="flex items-center justify-between p-6 border-b border-border">
                    <div>
                        <h2 className="text-xl font-semibold text-foreground">{product ? 'Edit Product' : 'Add New Product'}</h2>
                        <p className="mt-1 text-sm text-muted-foreground">{product ? `Editing: ${product?.name}` : 'Create a new product for your catalog'}</p>
                    </div>
                    <Button variant="ghost" size="icon" onClick={onClose}><Icon name="X" size={20} /></Button>
                </div>
                <div className="border-b border-border">
                    <div className="flex px-6 space-x-0">
                        {tabs?.map(tab => (
                            <button key={tab?.id} onClick={() => setActiveTab(tab?.id as any)} className={`flex items-center space-x-2 px-4 py-3 border-b-2 transition-smooth ${activeTab === (tab?.id as any) ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`}>
                                <Icon name={tab?.icon} size={16} />
                                <span className="font-medium">{tab?.label}</span>
                            </button>
                        ))}
                    </div>
                </div>
                <div className="p-6 overflow-y-auto max-h-[60vh]">
                    {activeTab === 'basic' && (
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <Input label="Product Name" required value={formData?.name} onChange={(e) => handleInputChange('name', (e?.target as HTMLInputElement).value)} placeholder="Enter product name" />
                                <Input label="SKU" required value={formData?.sku} onChange={(e) => handleInputChange('sku', (e?.target as HTMLInputElement).value)} placeholder="Product SKU" />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-foreground">Description</label>
                                <textarea value={formData?.description} onChange={(e) => handleInputChange('description', (e?.target as HTMLTextAreaElement).value)} placeholder="Product description..." rows={4} className="w-full px-3 py-2 border rounded-lg resize-none border-border focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" />
                            </div>
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                                <Input label="Price" type="number" required value={formData?.price} onChange={(e) => handleInputChange('price', (e?.target as HTMLInputElement).value)} placeholder="0.00" />
                                <Input label="Original Price" type="number" value={formData?.originalPrice} onChange={(e) => handleInputChange('originalPrice', (e?.target as HTMLInputElement).value)} placeholder="0.00" />
                                <Input label="Stock Quantity" type="number" required value={formData?.stock} onChange={(e) => handleInputChange('stock', (e?.target as HTMLInputElement).value)} placeholder="0" />
                            </div>
                            <Select label="Category" required options={categoryOptions} value={formData?.category} onChange={(value: string) => handleInputChange('category', value)} placeholder="Select category" />
                            <div className="space-y-4">
                                <h4 className="font-medium text-foreground">Product Status</h4>
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                    <label className="flex items-center space-x-2"><input type="checkbox" checked={formData?.isNew} onChange={(e) => handleInputChange('isNew', (e?.target as HTMLInputElement).checked)} className="w-4 h-4 bg-white rounded text-primary border-border focus:ring-primary focus:ring-2" /><span className="text-sm text-foreground">New Product</span></label>
                                    <label className="flex items-center space-x-2"><input type="checkbox" checked={formData?.isFeatured} onChange={(e) => handleInputChange('isFeatured', (e?.target as HTMLInputElement).checked)} className="w-4 h-4 bg-white rounded text-primary border-border focus:ring-primary focus:ring-2" /><span className="text-sm text-foreground">Featured</span></label>
                                    <label className="flex items-center space-x-2"><input type="checkbox" checked={formData?.onSale} onChange={(e) => handleInputChange('onSale', (e?.target as HTMLInputElement).checked)} className="w-4 h-4 bg-white rounded text-primary border-border focus:ring-primary focus:ring-2" /><span className="text-sm text-foreground">On Sale</span></label>
                                </div>
                            </div>
                        </div>
                    )}
                    {activeTab === 'images' && (
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <h4 className="font-medium text-foreground">Product Images</h4>
                                <Button variant="outline" size="sm" onClick={() => fileInputRef?.current?.click()} iconName="Plus" iconPosition="left">Add Images</Button>
                            </div>
                            <input ref={fileInputRef} type="file" multiple accept="image/*" onChange={(e) => handleImageUpload(e?.target?.files)} className="hidden" />
                            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                                {formData?.images?.map((image: string, index: number) => (
                                    <div key={index} className="relative group">
                                        <div className="overflow-hidden rounded-lg aspect-square bg-muted">
                                            <Image src={image} alt={`Product image ${index + 1}`} className="object-cover w-full h-full" />
                                        </div>
                                        <button onClick={() => removeImage(index)} className="absolute p-1 rounded-full opacity-0 top-2 right-2 bg-error text-error-foreground group-hover:opacity-100 transition-smooth"><Icon name="X" size={12} /></button>
                                        {index === 0 && (<span className="absolute px-2 py-1 text-xs rounded bottom-2 left-2 bg-primary text-primary-foreground">Main</span>)}
                                    </div>
                                ))}
                                <div onClick={() => fileInputRef?.current?.click()} className="flex items-center justify-center border-2 border-dashed rounded-lg cursor-pointer aspect-square border-border hover:border-primary transition-smooth">
                                    <div className="text-center"><Icon name="Plus" size={24} className="mx-auto mb-2 text-muted-foreground" /><span className="text-sm text-muted-foreground">Add Image</span></div>
                                </div>
                            </div>
                        </div>
                    )}
                    {activeTab === 'variants' && (
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <h4 className="font-medium text-foreground">Product Variants</h4>
                                <Button variant="outline" size="sm" onClick={addVariant} iconName="Plus" iconPosition="left">Add Variant</Button>
                            </div>
                            <div className="space-y-4">
                                {formData?.variants?.map((variant: any, index: number) => (
                                    <div key={variant?.id} className="p-4 border rounded-lg border-border">
                                        <div className="flex items-center justify-between mb-4">
                                            <h5 className="font-medium text-foreground">Variant {index + 1}</h5>
                                            <Button variant="ghost" size="sm" onClick={() => removeVariant(index)} iconName="Trash2"></Button>
                                        </div>
                                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                                            <Input label="Variant Name" value={variant?.name} onChange={(e) => updateVariant(index, 'name', (e?.target as HTMLInputElement).value)} placeholder="e.g., Red Large" />
                                            <Input label="SKU" value={variant?.sku} onChange={(e) => updateVariant(index, 'sku', (e?.target as HTMLInputElement).value)} placeholder="Variant SKU" />
                                            <Input label="Price" type="number" value={variant?.price} onChange={(e) => updateVariant(index, 'price', (e?.target as HTMLInputElement).value)} placeholder="0.00" />
                                            <Input label="Stock" type="number" value={variant?.stock} onChange={(e) => updateVariant(index, 'stock', (e?.target as HTMLInputElement).value)} placeholder="0" />
                                        </div>
                                    </div>
                                ))}
                                {formData?.variants?.length === 0 && (
                                    <div className="py-8 text-center text-muted-foreground">
                                        <Icon name="Layers" size={48} className="mx-auto mb-4 opacity-50" />
                                        <p>No variants added yet</p>
                                        <p className="text-sm">Add variants for different sizes, colors, or styles</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                    {activeTab === 'seo' && (
                        <div className="space-y-6">
                            <Input label="SEO Title" value={formData?.seoTitle} onChange={(e) => handleInputChange('seoTitle', (e?.target as HTMLInputElement).value)} placeholder="SEO optimized title" description="Recommended length: 50-60 characters" />
                            <div>
                                <label className="block mb-2 text-sm font-medium text-foreground">SEO Description</label>
                                <textarea value={formData?.seoDescription} onChange={(e) => handleInputChange('seoDescription', (e?.target as HTMLTextAreaElement).value)} placeholder="SEO meta description..." rows={3} className="w-full px-3 py-2 border rounded-lg resize-none border-border focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" />
                                <p className="mt-1 text-xs text-muted-foreground">Recommended length: 150-160 characters</p>
                            </div>
                            <Input label="Tags" value={formData?.tags} onChange={(e) => handleInputChange('tags', (e?.target as HTMLInputElement).value)} placeholder="tag1, tag2, tag3" description="Separate tags with commas" />
                        </div>
                    )}
                </div>
                <div className="flex items-center justify-between p-6 border-t border-border">
                    <div className="text-sm text-muted-foreground">{product ? 'Last updated: ' + new Date().toLocaleDateString() : 'New product'}</div>
                    <div className="flex items-center space-x-3">
                        <Button variant="ghost" onClick={onClose}>Cancel</Button>
                        <Button onClick={handleSave} iconName="Save" iconPosition="left">{product ? 'Update Product' : 'Create Product'}</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductEditor;


