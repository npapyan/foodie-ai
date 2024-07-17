"use client";
import Camera from "@/app/components/Camera";
import Title from "@/app/components/Title"

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <Title></Title>
            <Camera></Camera>
        </div>
    );
}
