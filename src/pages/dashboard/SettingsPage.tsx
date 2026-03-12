const SettingsPage = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-2xl font-bold">Settings</h1>
      <p className="text-sm text-muted-foreground">Manage your account and preferences</p>
    </div>
    <div className="rounded-xl border border-border bg-card p-6 max-w-2xl" style={{ boxShadow: "var(--shadow-card)" }}>
      <p className="text-sm text-muted-foreground">Settings page — configure your profile, notifications, and integrations here.</p>
    </div>
  </div>
);

export default SettingsPage;
