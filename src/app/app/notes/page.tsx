"use client";

import { Editor } from "novel";
import { useState } from "react";

export default function Notes() {

  const [data, setData] = useState("");

  return (
    <Editor
      defaultValue={data || ""}
      className={`h-[100vh] "basis-full"}`}
      onUpdate={(edit) => {
        const text = edit?.getText();
        setData(text as string);
      }}
    />
  )
}

