import React from 'react'
import NavBarSection from '../components/NavBarSection'
import HeroSection from '../components/HeroSection'
import ContentSection from '../components/ContentSection'
import GallarySection from '../components/GallarySection'
import HoverSection from '../components/HoverSection'
import FeatureSection from '../components/FeatureSection'
import PricingSection from '../components/PricingSection'
import TeamSection from '../components/TeamSection'
import TestimonialSection from '../components/TestimonialSection'
import ContactSection from '../components/ContactSection'
import FooterSection from '../components/FooterSection'

const LandingPage = () => {
  return (
    <div>
        <NavBarSection />
        <HeroSection />
        <ContentSection />
        <GallarySection />
        <HoverSection />
        <FeatureSection />
        <PricingSection />
        <TeamSection />
        <TestimonialSection />
        <ContactSection />
        <FooterSection />
    </div>
  )
}
export default LandingPage