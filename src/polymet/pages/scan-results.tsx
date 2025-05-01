  <div className="space-y-3">
    {requiredActions.items.map((action) => (
      <RequiredActionItem
        key={action.id}
        title={action.title}
        description={action.description}
        severity={action.severity}
        onGetHelp={() => {}}
      />
    ))}
  </div>
</div>

{/* Compliance Sections */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
  {sections.map((section) => (
    <ComplianceSection
      key={section.id}
      title={section.title}
      score={section.score}
      items={section.items}
    />
  ))} 