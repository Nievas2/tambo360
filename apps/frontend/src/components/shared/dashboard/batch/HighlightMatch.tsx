interface HighlightMatchProps {
  text: string
  query: string
  className?: string
}

export function HighlightMatch({
  text,
  query,
  className,
}: HighlightMatchProps) {
  if (!query.trim()) return <span className={className}>{text}</span>

  const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const parts = text.split(new RegExp(`(${escapedQuery})`, 'gi'))

  return (
    <span className={className}>
      {parts.map((part, i) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <mark key={i} className="bg-[#D7ECAF] text-inherit px-0">
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </span>
  )
}
