import { useState, useEffect } from "react";
import {
  Dialog,
  DialogSurface,
  DialogBody,
  Button,
  Input,
  Select,
  Label,
} from "@fluentui/react-components";
import { DismissRegular } from "@fluentui/react-icons";
import type { SecurityRole } from "../types/securityRole";

interface Props {
  open: boolean;
  onClose: () => void;
  onCreated: (role: SecurityRole) => void;
}

interface FormState {
  solution: string;
  module: string;
  roleCode: string;
  roleName: string;
  roleType: string;
}

const INITIAL_FORM: FormState = {
  solution: "",
  module: "",
  roleCode: "",
  roleName: "",
  roleType: "Custom Role",
};

const SOLUTION_OPTIONS = [
  { code: "AIW",  name: "Agentic Intelligent Workplace" },
  { code: "AESS", name: "Agentic ERP & Shared Services" },
  { code: "ADLT", name: "Adaptive Learning & Talent" },
  { code: "ACRM", name: "Agentic CRM & Marketer" },
];

const MODULE_OPTIONS: Record<string, string[]> = {
  AIW:  ["AIW"],
  AESS: ["AESS"],
  ADLT: ["ADLT"],
  ACRM: ["ACRM"],
};

const ROLE_CODES = [
  "GLOBAL_ADMIN",
  "ADMIN",
  "CONTRIBUTOR",
  "VIEWER",
  "CUSTOM_ROLE_01",
  "CUSTOM_ROLE_02",
];

// ── Shared label style ──
const labelStyle: React.CSSProperties = {
  fontSize: '14px',
  fontWeight: 700,
  color: '#193e6b',
  marginBottom: '6px',
  display: 'block',
};

// ── Shared field wrapper ──
const fieldStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
};

export function AddSecurityRoleModal({ open, onClose, onCreated }: Props) {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);

  useEffect(() => {
    if (open) setForm(INITIAL_FORM);
  }, [open]);

  const availableModules = form.solution
    ? MODULE_OPTIONS[form.solution] ?? []
    : [];

  function setField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit() {
    const newRole: SecurityRole = {
      id: crypto.randomUUID(),
      solutionCode: form.solution,
      solutionName:
        SOLUTION_OPTIONS.find((s) => s.code === form.solution)?.name ??
        form.solution,
      moduleCode: form.module,
      moduleName: form.module,
      roleCode: form.roleCode,
      roleName: form.roleName,
      roleType: form.roleType === "System Role" ? "SYSTEM" : "CUSTOM",
    };
    onCreated(newRole);
    onClose();
  }

  return (
    <Dialog open={open}>
      <DialogSurface
        style={{
          width: '640px',
          maxWidth: '95vw',
          borderRadius: '12px',
          padding: '0',
          overflow: 'hidden',
          backgroundColor: '#ffffff',
        }}
      >
        <DialogBody style={{ padding: '0', display: 'flex', flexDirection: 'column' }}>

          {/* ── Header ── */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '24px 28px 20px 28px',
            }}
          >
            <span
              style={{
                fontSize: '20px',
                fontWeight: 700,
                color: '#193e6b',
              }}
            >
              Add New Security Role
            </span>
            <button
              onClick={onClose}
              aria-label="Close"
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#6b7280',
                fontSize: '20px',
                lineHeight: 1,
                padding: '2px 6px',
                borderRadius: '4px',
              }}
            >
              ×
            </button>
          </div>

          {/* ── Divider ── */}
          <div style={{ height: '1px', backgroundColor: '#e5e7eb', margin: '0 0 8px 0' }} />

          {/* ── Form Body ── */}
          <div
            style={{
              padding: '24px 28px',
              display: 'flex',
              flexDirection: 'column',
              gap: '22px',
            }}
          >

            {/* Row 1 — Solution + Module */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>

              {/* Solution */}
              <div style={fieldStyle}>
                <label style={labelStyle}>Solution *</label>
                <Select
                  value={form.solution}
                  onChange={(_, d) => {
                    setField("solution", d.value);
                    setField("module", "");
                  }}
                >
                  <option value="">Select Solution</option>
                  {SOLUTION_OPTIONS.map((s) => (
                    <option key={s.code} value={s.code}>
                      {s.code} – {s.name}
                    </option>
                  ))}
                </Select>
              </div>

              {/* Module */}
              <div style={fieldStyle}>
                <label style={labelStyle}>Module *</label>
                <Select
                  value={form.module}
                  disabled={!form.solution}
                  onChange={(_, d) => setField("module", d.value)}
                >
                  <option value="">Select Module</option>
                  {availableModules.map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </Select>
              </div>

            </div>

            {/* Row 2 — Role Code + Role Name */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>

              {/* Role Code */}
              <div style={fieldStyle}>
                <label style={labelStyle}>Role Code *</label>
                <Select
                  value={form.roleCode}
                  onChange={(_, d) => setField("roleCode", d.value)}
                >
                  <option value="">Select Role Code</option>
                  {ROLE_CODES.map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </Select>
              </div>

              {/* Role Name */}
              <div style={fieldStyle}>
                <label style={labelStyle}>Role Name *</label>
                <Input
                  placeholder="e.g., Administrator"
                  value={form.roleName}
                  onChange={(_, d) => setField("roleName", d.value)}
                />
              </div>

            </div>

            {/* Row 3 — Role Type (left half only) */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div style={fieldStyle}>
                <label style={labelStyle}>Role Type *</label>
                <Select
                  value={form.roleType}
                  onChange={(_, d) => setField("roleType", d.value)}
                >
                  <option value="Custom Role">Custom Role</option>
                  <option value="System Role">System Role</option>
                </Select>
              </div>
              {/* Right side intentionally empty */}
              <div />
            </div>

          </div>

          {/* ── Divider ── */}
          <div style={{ height: '1px', backgroundColor: '#e5e7eb' }} />

          {/* ── Footer Buttons ── */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
              gap: '12px',
              padding: '16px 28px',
            }}
          >
            <Button
              appearance="secondary"
              onClick={onClose}
              style={{
                minWidth: '90px',
                borderRadius: '6px',
              }}
            >
              Cancel
            </Button>
            <Button
              appearance="primary"
              onClick={handleSubmit}
              style={{
                minWidth: '100px',
                borderRadius: '6px',
                backgroundColor: '#193e6b',
                border: 'none',
              }}
            >
              Add Role
            </Button>
          </div>

        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
}