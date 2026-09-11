import { TestimonialSlider } from "./ui/testimonial-slider-1";
import peopleImage from "../../images/office1.jpeg";
import financeImage from "../../images/office4.jpeg";
import operationsImage from "../../images/office3.jpeg";
import "./Testimonials.css";

const REVIEWS = [
  {
    quote: "We moved four spreadsheets and a ticketing queue into Crodlin in under three weeks. Payroll close went from four days to one afternoon.",
    id: "priya",
    imageSrc: peopleImage,
    imageAlt: "A calm workspace with a wooden desk and upholstered chair",
    name: "Priya Nandan",
    affiliation: "Head of People, Kestrel Works",
  },
  {
    quote: "The finance view alone paid for itself. We finally see workforce cost in real time instead of reconstructing it every month end.",
    id: "daniel",
    imageSrc: financeImage,
    imageAlt: "A softly lit desk with a notebook and modern lamp",
    name: "Daniel Osei",
    affiliation: "VP Finance, Fenwick Partners",
  },
  {
    quote: "Our managers actually use it, which is the real test. Leave requests and approvals just happen now instead of living in email.",
    id: "meera",
    imageSrc: operationsImage,
    imageAlt: "Sculpted wooden chairs in a bright shared space",
    name: "Meera Chandran",
    affiliation: "COO, Loft & Union",
  },
];

export default function Testimonials() {
  return (
    <section className="client-stories" id="why" aria-labelledby="client-stories-title">
      <div className="container">
        <div className="client-stories-heading">
          <h2 id="client-stories-title"><span>Client:</span> Helping brands to grow and say their success stories to the world.</h2>
          <p>We help ambitious teams simplify their work and make room for growth. Here are the stories of the people building their next chapter with Crodlin.</p>
        </div>
        <TestimonialSlider reviews={REVIEWS} />
      </div>
    </section>
  );
}
