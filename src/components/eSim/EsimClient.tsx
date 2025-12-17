'use client';

import { EsimBody } from "./EsimBody";

export default function EsimClient() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 ">
      <EsimBody />
    </div>
  );
}
