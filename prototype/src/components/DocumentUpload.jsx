import React, { useState, useRef } from 'react'
import { Upload, FileText, CheckCircle, X } from 'lucide-react'
import { cn } from '../lib/utils'

export default function DocumentUpload({ label, description, onUpload, compact = false }) {
  const [dragOver, setDragOver] = useState(false)
  const [uploadedFile, setUploadedFile] = useState(null)
  const [isUploading, setIsUploading] = useState(false)
  const inputRef = useRef(null)

  function handleFile(file) {
    if (!file) return
    setIsUploading(true)
    setTimeout(() => {
      setIsUploading(false)
      setUploadedFile(file)
      onUpload && onUpload(file)
    }, 1200)
  }

  function handleDrop(e) {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files[0]
    handleFile(file)
  }

  function handleChange(e) {
    handleFile(e.target.files[0])
  }

  function removeFile() {
    setUploadedFile(null)
    if (inputRef.current) inputRef.current.value = ''
  }

  if (uploadedFile) {
    return (
      <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
        <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
          <FileText size={16} className="text-green-600" aria-hidden="true" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium text-gray-900 truncate">
            {uploadedFile.name}
          </div>
          <div className="flex items-center gap-1 text-xs text-green-600 font-medium mt-0.5">
            <CheckCircle size={11} aria-hidden="true" />
            Uploaded successfully
          </div>
        </div>
        <button
          onClick={removeFile}
          className="text-gray-400 hover:text-gray-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2 rounded"
          aria-label="Remove uploaded file"
        >
          <X size={16} aria-hidden="true" />
        </button>
      </div>
    )
  }

  return (
    <div>
      {label && (
        <label className="label-base" htmlFor="doc-upload-input">
          {label}
        </label>
      )}
      {description && (
        <p className="text-sm text-gray-500 mb-2">{description}</p>
      )}
      <div
        role="button"
        tabIndex={0}
        onDragOver={e => { e.preventDefault(); setDragOver(true) }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); inputRef.current?.click() } }}
        className={cn(
          'border-2 border-dashed rounded-xl transition-all duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2',
          compact ? 'p-4' : 'p-8',
          dragOver
            ? 'border-green-600 bg-green-50'
            : 'border-gray-300 hover:border-gray-400 bg-white hover:bg-gray-50'
        )}
        aria-label={label || 'File upload area — click or drag and drop'}
      >
        <input
          ref={inputRef}
          id="doc-upload-input"
          type="file"
          className="sr-only"
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={handleChange}
          aria-label={label || 'Choose file to upload'}
        />
        <div className={cn('flex flex-col items-center text-center', compact ? 'gap-2' : 'gap-3')}>
          {isUploading ? (
            <>
              <div className="w-8 h-8 border-2 border-green-600 border-t-transparent rounded-full animate-spin" aria-hidden="true" />
              <span className="text-sm text-gray-600">Uploading...</span>
            </>
          ) : (
            <>
              <div className={cn(
                'rounded-xl bg-gray-100 flex items-center justify-center',
                compact ? 'w-8 h-8' : 'w-12 h-12'
              )} aria-hidden="true">
                <Upload size={compact ? 16 : 20} className="text-gray-400" />
              </div>
              <div>
                <span className="text-sm font-medium text-green-600">
                  Click to upload
                </span>
                <span className="text-sm text-gray-500"> or drag and drop</span>
                {!compact && (
                  <p className="text-xs text-gray-400 mt-1">
                    PDF, JPG, or PNG · Max 10 MB
                  </p>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
