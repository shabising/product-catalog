export default function Loader() {
  return (
    <div className="grid grid-cols-3 gap-4">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="h-52 rounded-xl bg-gray-300 animate-pulse"
        />
      ))}
    </div>
  );
}