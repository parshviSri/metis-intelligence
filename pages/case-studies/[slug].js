import Nav from "../../components/layout/Nav";
import Footer from "../../components/layout/Footer";
import CaseStudyDetail from "../../components/case-studies/CaseStudyDetail";
import { caseStudies, getCaseStudyBySlug } from "../../data/caseStudies";

export default function CaseStudyPage({ caseStudy }) {
  if (!caseStudy) {
    return null;
  }

  return (
    <div className="min-vh-100 bg-white">
      <Nav />
      <main>
        <CaseStudyDetail caseStudy={caseStudy} />
      </main>
      <Footer />
    </div>
  );
}

export async function getStaticPaths() {
  return {
    paths: caseStudies.map((caseStudy) => ({
      params: { slug: caseStudy.slug },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  return {
    props: {
      caseStudy: getCaseStudyBySlug(params.slug) || null,
    },
  };
}
