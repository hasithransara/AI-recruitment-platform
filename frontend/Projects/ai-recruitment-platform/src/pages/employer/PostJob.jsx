import JobForm from "../../components/jobPost/JobForm";

function PostJob() {
  return (
    <div className="min-h-screen bg-slate-100 p-8">

      <h1 className="text-4xl font-bold mb-2">
        Post New Job
      </h1>

      <p className="text-slate-500 mb-8">
        Create a new job opportunity for candidates.
      </p>

      <JobForm />

    </div>
  );
}

export default PostJob;