import Hero from '../components/Hero'
import SectionAbout from '../components/SectionAbout'
import SectionMemories from '../components/SectionMemories'
import FloatingUploadButton from '../components/FloatingUploadButton'
import PageSectionWrapper from '../components/effects/PageSectionWrapper'

export default function HomePage() {
  return (
    <>
      <Hero />
      <PageSectionWrapper>
        <SectionAbout />
      </PageSectionWrapper>
      <PageSectionWrapper>
        <SectionMemories />
      </PageSectionWrapper>
      <FloatingUploadButton />
    </>
  )
}
