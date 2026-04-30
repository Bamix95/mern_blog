const AuthLayout = ({ children, subTitle }) => {
  return (
    <main className="w-full min-h-screen grid place-items-center px-4 py-6">
      <div className="w-full max-w-md bg-card rounded-2xl p-6 shadow-md border border-border">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-display font-bold tracking-wide">
            Ink<span className="text-accent">Well</span>
          </h1>
          <p className="text-sm text-text-muted">{subTitle}</p>
        </div>
        <section className="mt-8">{children}</section>
      </div>
    </main>
  );
};

export default AuthLayout;
