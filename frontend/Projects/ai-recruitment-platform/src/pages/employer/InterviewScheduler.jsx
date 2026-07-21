import InterviewForm from "../../components/interviews/InterviewForm";

function InterviewScheduler() {
  return (
    <div className="min-h-screen bg-slate-100 p-8">

      <h1 className="text-4xl font-bold mb-2">
        Interview Scheduler
      </h1>

      <p className="text-slate-500 mb-8">
        Schedule interviews with selected candidates.
      </p>

      <InterviewForm />

    </div>
  );
}

export default InterviewScheduler;