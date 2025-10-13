'use client';

import { ChangeEvent, MouseEvent, useEffect, useRef, useState } from 'react';

import Image from 'next/image';

import { Edit2Icon, FileText, Upload as UploadIcon } from 'lucide-react';

import { useToast } from './toast';

interface UploadProps {
  accept?: string;
  beforeUpload?: (
    fileList: FileList | null,
    existingFiles: File[]
  ) => boolean | string;
  disabled?: boolean;
  multiple?: boolean;
  onChange?: (newFiles: File[], oldFiles: File[]) => void;
  onFileRemove?: (updatedFiles: File[]) => void;
  uploadLimit?: number;
  defaultFiles?: File[];
  className?: string;
  heightClass?: string;
  widthClass?: string;
  uploadText?: React.ReactNode;
  helperText?: React.ReactNode;
}

const Upload: React.FC<UploadProps> = ({
  accept = 'image/*,application/pdf',
  beforeUpload,
  disabled = false,
  multiple = false,
  onChange,
  uploadLimit,
  defaultFiles = [],
  className = '',
  heightClass = 'md:h-[320px]',
  widthClass = 'md:w-[400px]',
  uploadText,
  helperText,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(false);
  const { push } = useToast();

  useEffect(() => {
    if (defaultFiles.length) setFiles(defaultFiles);
  }, [defaultFiles]);

  const triggerMessage = (msg: string = 'Upload Failed!') => {
    push(msg, 'error');
    setError(true);
    setTimeout(() => setError(false), 3000); // reset error border after 3s
  };

  const pushFile = (newFiles: FileList | null, fileArr: File[]) => {
    if (newFiles) {
      for (const f of Array.from(newFiles)) fileArr.push(f);
    }
    return fileArr;
  };

  const addNewFiles = (newFiles: FileList | null) => {
    let fileArr = [...files];
    if (typeof uploadLimit === 'number' && uploadLimit !== 0) {
      if (uploadLimit === 1) {
        fileArr = [];
        return pushFile(newFiles, fileArr);
      }
      if (fileArr.length >= uploadLimit) return fileArr;
    }
    return pushFile(newFiles, fileArr);
  };

  const simulateProgress = () => {
    setIsUploading(true);
    setProgress(0);
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsUploading(false), 500);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const onNewFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const { files: newFiles } = e.target;
    let result: boolean | string = true;

    // Check allowed type if accept="application/pdf"
    if (accept === 'application/pdf' && newFiles) {
      for (const file of Array.from(newFiles)) {
        if (file.type !== 'application/pdf') {
          triggerMessage('Only PDF files are allowed!');
          e.target.value = '';
          return;
        }
      }
    }

    if (beforeUpload) {
      result = beforeUpload(newFiles, files);
      if (result === false) {
        triggerMessage();
        return;
      }
      if (typeof result === 'string') {
        triggerMessage(result);
        return;
      }
    }

    if (result) {
      simulateProgress();
      const updatedFiles = addNewFiles(newFiles);
      setFiles(updatedFiles);
      onChange?.(updatedFiles, files);
    }
    e.target.value = '';
  };

  const triggerUpload = (e: MouseEvent<HTMLDivElement>) => {
    if (!disabled) fileInputRef.current?.click();
    e.stopPropagation();
  };

  const handleEditClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    fileInputRef.current?.click();
  };

  return (
    <div
      className={`mx-2 flex h-auto w-auto flex-col rounded-lg sm:mx-auto ${heightClass} ${widthClass} ${files.length === 0 ? 'border-2 border-dashed' : ''} ${error ? 'border-red-500' : 'border-ui-neutralBorderActive'} transition ${className}`}
    >
      <input
        ref={fileInputRef}
        type="file"
        disabled={disabled}
        multiple={multiple}
        accept={accept}
        hidden
        onChange={onNewFileUpload}
      />

      {isUploading ? (
        <div className="flex h-full flex-col items-center justify-center gap-3 p-6 font-diatype">
          <UploadIcon size={28} className="text-ui-neutralSurfaceOnColor" />
          <div className="w-2/4 rounded-full bg-ui-neutralSurfaceSupport">
            <div
              className="h-1.5 rounded-full bg-ui-colorContentSuccess transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-sm text-ui-neutralSurfaceOnColor">
            {progress < 100 ? 'Uploading...' : 'Completed'}
          </span>
        </div>
      ) : files.length === 0 ? (
        <div
          onClick={triggerUpload}
          className="flex h-full cursor-pointer flex-col items-center justify-center p-6"
        >
          <div className="flex flex-col items-center text-center">
            <div className="mb-3">
              <Image
                src="/images/upload-01.svg"
                width={24}
                height={24}
                alt="Upload Icon"
              />
            </div>
            {uploadText ?? (
              <p className="font-diatype text-sm font-medium text-ui-neutralSurfaceOnColor">
                Drag & Drop file here <br /> &nbsp; or{' '}
                <span className="text-sm font-medium underline">
                  upload a file
                </span>
                &nbsp; from your computer
              </p>
            )}

            {helperText ?? (
              <p className="pt-2 font-diatype text-sm font-medium text-ui-neutralContentLight">
                Only <span className="text-ui-neutralSurfaceOnColor">PDF</span>{' '}
                files allowed
              </p>
            )}
          </div>
        </div>
      ) : (
        <div className="relative flex h-full w-full flex-col">
          <div className="flex-1 overflow-hidden">
            {files.map((file, index) => {
              const fileURL = URL.createObjectURL(file);
              const isImage = file.type.startsWith('image/');
              const isVideo = file.type.startsWith('video/');
              const isPdf = file.type === 'application/pdf';

              return (
                <div key={index} className="h-full w-full">
                  {isImage && (
                    <img
                      src={fileURL}
                      alt={file.name}
                      className="h-full max-h-[200px] w-full rounded-[31px] object-cover"
                    />
                  )}
                  {isVideo && (
                    <video
                      src={fileURL}
                      controls
                      className="h-full w-full rounded-[31px] object-cover"
                    />
                  )}
                  {isPdf && (
                    <div className="flex flex-col items-center gap-2">
                      <FileText size={40} className="text-red-500" />
                      <p className="text-sm font-medium text-ui-neutralSurfaceOnColor">
                        {file.name}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="absolute bottom-5 right-5 flex items-center justify-center">
            <button
              type="button"
              onClick={handleEditClick}
              className="flex items-center gap-2 rounded-full bg-ui-neutralSurfaceOnColor px-2.5 py-2.5 text-sm text-white transition-colors hover:bg-gray-700"
            >
              <Edit2Icon className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Upload;
