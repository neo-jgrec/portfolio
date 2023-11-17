import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AllProjects, ContactForm, Home, NotFound, ProjectPage } from "../pages";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project/:projectName" element={<ProjectPage />} />
        <Route path="/projects" element={<AllProjects />} />
        <Route path="/contact" element={<ContactForm />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
