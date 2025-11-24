import { Button } from "@/components/ui/button";
import { useCounter } from "@/hooks";

export const Counter = () => {
  const { count, increment, decrement, reset } =
    useCounter(0);
  return (
    <div className="bg-background text-foreground flex flex-col items-center gap-6 border p-4 rounded-lg shadow-lg">
      <h1 className="text-3xl">{count}</h1>
      <div className="flex space-x-4">
        <Button onClick={increment}>
          Increment
        </Button>
        <Button onClick={reset}>Reset</Button>
        <Button onClick={decrement}>
          Decrement
        </Button>
      </div>
    </div>
  );
};
