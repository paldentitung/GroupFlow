import ProjectCard from "./ProjectCard";
export default function ProjectListing({ projects = [], loading }) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="h-40 rounded-xl bg-[#f3f4f6] animate-pulse border border-[#e8eaed]"
          />
        ))}
      </div>
    );
  }

  if (!projects || projects.length === 0) {
    return (
      <div className="text-center py-12 bg-white border border-[#e8eaed] rounded-xl">
        <p className="text-sm font-medium text-[#111827]">No projects found</p>
        <p className="text-xs text-[#6b7280] mt-1">
          Start by creating your first project
        </p>

        {/* <button className="mt-4 px-4 py-2 bg-[#4f46e5] text-white text-sm rounded-lg hover:bg-[#4338ca]">
          + Create Project
        </button> */}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-2">
      {projects.map((p) => (
        <ProjectCard
          key={p._id}
          id={p._id}
          name={p.name}
          desc={p.description}
          status={p.status}
          progress={p.progress}
          due={p.dueDate}
          members={p.members}
          owner={p.owner}
        />
      ))}
    </div>
  );
}
