const Loading = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <div className="relative w-48 h-48 flex items-center justify-center">
        {/* Capa base: gris y transparente */}
        <img
          src="/isotipo_tambo 1.svg"
          alt=""
          className="absolute inset-0 w-full h-full object-contain"
          style={{ filter: 'grayscale(100%) opacity(0.15)' }}
        />

        {/* Capa fill: se revela de abajo hacia arriba */}
        <img
          src="/isotipo_tambo 1.svg"
          alt="Cargando..."
          className="absolute inset-0 w-full h-full object-contain"
          style={{
            animation: 'fillUp 1s cubic-bezier(0.4, 0, 0.2, 1) infinite',
          }}
        />
      </div>

      <style>{`
        @keyframes fillUp {
          0%   { clip-path: inset(100% 0 0 0); }
          85%  { clip-path: inset(0 0 0 0); }
          100% { clip-path: inset(0 0 0 0); }
        }
      `}</style>
    </div>
  )
}

export default Loading
