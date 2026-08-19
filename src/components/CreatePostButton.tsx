import { createPortal } from "react-dom";
import type {NewPostInput} from "@/hooks/usePosts.ts";
import {type FormEvent, useEffect, useState} from "react";


interface CreatePostButtonProps {
    onCreate: (input: NewPostInput) => void;
}

export function CreatePostButton({onCreate}: CreatePostButtonProps) {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [title, setTitle] = useState<string>("");
    const [body, setBody] = useState<string>("");
    const [tagsText, setTagsText] = useState<string>("");

    function handleClose() {
        setIsOpen(false);
        setTitle("");
        setBody("");
        setTagsText("");
    }

    useEffect(() => {
        if (!isOpen)
            return;

        function handleKeyDown(e: KeyboardEvent) {
            if (e.key === "Escape")
                handleClose();
        }

        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [isOpen])

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        if (!title.trim() || !body.trim())
            return

        const tags = tagsText
            .split(",")
            .map(tag => tag.trim())
            .filter(Boolean)

        onCreate({title: title.trim(), body: body.trim(), tags})
        handleClose()
    }

    return (
        <>
            <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="shrink-0 rounded-full bg-amber-300 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-amber-200"
            >
                Create post
            </button>

            {isOpen && createPortal(
                <div
                    className="fixed inset-0 z-20 flex items-center justify-center bg-slate-950/70 p-4"
                    onClick={handleClose}
                >
                    <div
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="create-post-heading"
                        onClick={e => e.stopPropagation()}
                        className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-2xl border border-slate-800 bg-slate-900 p-6"
                    >
                        <h2 id="create-post-heading" className="text-lg font-bold text-amber-200">
                            Create post
                        </h2>

                        <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4">
                            <div>
                                <label htmlFor="post-title" className="text-sm font-medium text-slate-300">
                                    Title
                                </label>
                                <input
                                    id="post-title"
                                    type="text"
                                    value={title}
                                    onChange={e => setTitle(e.target.value)}
                                    required
                                    className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:border-amber-300/60 focus:outline-none focus:ring-2 focus:ring-amber-300/20"
                                    placeholder="What's on your mind?"
                                />
                            </div>

                            <div>
                                <label htmlFor="post-body" className="text-sm font-medium text-slate-300">
                                    Body
                                </label>
                                <textarea
                                    id="post-body"
                                    value={body}
                                    onChange={e => setBody(e.target.value)}
                                    required
                                    rows={4}
                                    className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:border-amber-300/60 focus:outline-none focus:ring-2 focus:ring-amber-300/20"
                                    placeholder="Write something..."
                                />
                            </div>

                            <div>
                                <label htmlFor="post-tags" className="text-sm font-medium text-slate-300">
                                    Tags <span className="text-slate-500">(comma separated, optional)</span>
                                </label>
                                <input
                                    id="post-tags"
                                    type="text"
                                    value={tagsText}
                                    onChange={e => setTagsText(e.target.value)}
                                    className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:border-amber-300/60 focus:outline-none focus:ring-2 focus:ring-amber-300/20"
                                    placeholder="react, typescript"
                                />
                            </div>

                            <div className="mt-2 flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={handleClose}
                                    className="rounded-full px-4 py-2 text-sm font-medium text-slate-300 hover:bg-slate-800"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="rounded-full bg-amber-300 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-amber-200"
                                >
                                    Post
                                </button>
                            </div>
                        </form>
                    </div>
                </div>,
                document.body
            )}
        </>
    )
}