"use client";
import Camera from "@/app/components/Camera";

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-4xl mb-4 gradient-text text-center">Decode, Discover, Digest</h1>
            <Camera></Camera>
        </div>
    );
}
