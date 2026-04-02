export function StartScreen({ onStart }: { onStart: () => void }) {
  return (
    <main className="screen center">
      <h1>Kitchen Decision Game</h1>
      <p>Choose between 2 options at a time; winner advances each round.</p>
      <button onClick={onStart}>Start Game</button>
    </main>
  );
}
