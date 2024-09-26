import InputBar from "@/components/ui/inputBar";

export default function Home() {
  return (
    <div className="h-full w-full flex items-center justify-center p-4">
      <div className="h-full w-full border flex flex-col justify-between">
        <div className="h-full w-full "></div>
        <div className="h-12 w-full">
          <InputBar />
        </div>
      </div>
    </div>
  );
}
