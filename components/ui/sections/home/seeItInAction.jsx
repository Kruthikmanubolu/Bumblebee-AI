import React from 'react'

const SeeItInActionSection = () => {
  return (
    <section className="py-20 bg-background/40">
        <div className="container mx-auto text-center px-4 md:px-6">
          <h2 className="text-4xl font-bold mb-4">See It in Action</h2>
          <p className="text-muted-foreground mb-8">
            Watch how BumbleBee helps you to create a cover letter template with just minimal effort.
          </p>
          <div className="relative max-w-6xl mx-auto rounded-2xl overflow-hidden shadow-lg">
            <video
              className="w-full"
              controls
              poster="/video-thumbnail.png"
            >
              <source src="/demo.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </section>
  )
}

export default SeeItInActionSection
