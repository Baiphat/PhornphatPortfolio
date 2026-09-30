import { d } from "@/lib/d";
import { CertificateGallery } from "./CertificateGallery";

export function Certificates() {
  return (
    <section id="certificates" className="sec">
      <div className="wrap">
        <h2 className="grad rv">Certificates</h2>
        <p className="sub rv" style={d(".08s")}>My proudest achievement</p>
        <CertificateGallery />
      </div>
    </section>
  );
}
