<script setup>
import ExtensionsSection from "./sections/ExtensionsSection.vue";
import ProcessSections from "./sections/ProcessSections.vue";
import ServiceSection from "./sections/ServiceSection.vue";
import PriceListSection from "./sections/PriceListSection.vue";
import CommitmentSection from "./sections/CommitmentSection.vue";
import FAQSection from "./sections/FAQSection.vue";
import BlockSection from "./sections/BlockSection.vue";
import BlogSection from "./sections/BlogSection.vue";
import PaySection from "./sections/PaySection.vue";
import NotiSection from "./sections/NotiSection.vue";
</script>

<template>
  <div>
    <NotiSection></NotiSection>
    <ExtensionsSection></ExtensionsSection>
    <ProcessSections></ProcessSections>
    <ServiceSection></ServiceSection>
    <PriceListSection></PriceListSection>
    <CommitmentSection></CommitmentSection>
    <FAQSection></FAQSection>
    <BlockSection></BlockSection>
    <BlogSection></BlogSection>
    <PaySection></PaySection>
  </div>
</template>
