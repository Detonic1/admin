import React from "react";
import { useState } from "react";
import Image from "next/image";
import "../styles/formA.css"

const forms = () => {
    
    // Sample applications data - in a real app, this would come from an API
  const [applications, setApplications] = useState([
    {
      id: "A001",
      userId: "John Doe",
      trackingId: "T12345",
      email: "john.doe@example.com",
      phone: "+12345678990",
      school: "State University",
      major: "Biology",
      amount: "$10,000",
      status: "Pending",
      documents: [
        { name: "passport_jdoe.pdf", type: "Passport File" },
        { name: "admission_state_univ.pdf", type: "Admission Letter" },
        { name: "invoice_spring2024.pdf", type: "School Bill" },
        { name: "drivers_license.jpg", type: "Valid ID" }
      ],
      signature: "john_doe_signature.png",
      requestedDocuments: [
        { type: "Bank Statement", status: "Requested", requestDate: "Apr 23, 2024" }
      ],
      auditLog: [
        {
          date: "Apr 23, 2024 10:15 AM",
          admin: "Admin User",
          action: "Requested document",
          note: "Please provide bank statement for proof of funds"
        },
        {
          date: "Apr 22, 2024 09:30 AM",
          admin: "System",
          action: "Application received",
          note: "Initial submission"
        }
      ]
    },
    {
      id: "A002",
      userId: "Jane Smith",
      trackingId: "T67890",
      email: "jane.smith@example.com",
      phone: "+13334445555",
      school: "City College",
      major: "Computer Science",
      amount: "$8,500",
      status: "Approved",
      documents: [
        { name: "passport_jsmith.pdf", type: "Passport File" },
        { name: "admission_city_college.pdf", type: "Admission Letter" },
        { name: "invoice_fall2024.pdf", type: "School Bill" },
        { name: "state_id.jpg", type: "Valid ID" }
      ],
      signature: "jane_smith_signature.png",
      requestedDocuments: [],
      auditLog: [
        {
          date: "Apr 25, 2024 03:45 PM",
          admin: "Admin User",
          action: "Approved application",
          note: "All documents are in order"
        },
        {
          date: "Apr 21, 2024 11:20 AM",
          admin: "System",
          action: "Application received",
          note: "Initial submission"
        }
      ]
    },
    {
      id: "A003",
      userId: "Carlos Rodriguez",
      trackingId: "T24680",
      email: "carlos.r@example.com",
      phone: "+17778889999",
      school: "Tech Institute",
      major: "Engineering",
      amount: "$12,000",
      status: "Denied",
      documents: [
        { name: "passport_carlos.pdf", type: "Passport File" },
        { name: "admission_tech.pdf", type: "Admission Letter" },
        { name: "invoice_spring2024.pdf", type: "School Bill" }
      ],
      signature: "carlos_rodriguez_signature.png",
      requestedDocuments: [
        { type: "Valid ID", status: "Not Submitted", requestDate: "Apr 22, 2024" }
      ],
      auditLog: [
        {
          date: "Apr 24, 2024 02:30 PM",
          admin: "Admin User",
          action: "Denied application",
          note: "Missing valid ID document"
        },
        {
          date: "Apr 22, 2024 11:45 AM",
          admin: "Admin User",
          action: "Requested document",
          note: "Please provide a valid ID"
        },
        {
          date: "Apr 20, 2024 10:00 AM",
          admin: "System",
          action: "Application received",
          note: "Initial submission"
        }
      ]
    }
  ]);

  // State for current application index
  const [currentAppIndex, setCurrentAppIndex] = useState(0);
  
  // Current form data is the current application
  const formData = applications[currentAppIndex];
  
  // Admin note input state - this will now be used for document requests as well
  const [adminNote, setAdminNote] = useState("");

  // Handle approve action
  const handleApprove = () => {
    const now = new Date();
    const dateString = now.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
    const timeString = now.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
    const timestamp = `${dateString} ${timeString}`;
    
    // Update applications array with the new status and audit log entry
    const updatedApplications = [...applications];
    updatedApplications[currentAppIndex] = {
      ...updatedApplications[currentAppIndex],
      status: "Approved",
      auditLog: [
        {
          date: timestamp,
          admin: "Admin User",
          action: "Approved application",
          note: adminNote
        },
        ...updatedApplications[currentAppIndex].auditLog
      ]
    };
    
    setApplications(updatedApplications);
    setAdminNote("");
  };

  // Handle deny action
  const handleDeny = () => {
    const now = new Date();
    const dateString = now.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
    const timeString = now.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
    const timestamp = `${dateString} ${timeString}`;
    
    // Update applications array with the new status and audit log entry
    const updatedApplications = [...applications];
    updatedApplications[currentAppIndex] = {
      ...updatedApplications[currentAppIndex],
      status: "Denied",
      auditLog: [
        {
          date: timestamp,
          admin: "Admin User",
          action: "Denied application",
          note: adminNote
        },
        ...updatedApplications[currentAppIndex].auditLog
      ]
    };
    
    setApplications(updatedApplications);
    setAdminNote("");
  };

  // Handle send document request
  const handleSendDocumentRequest = () => {
    if (!adminNote.trim()) return;
    
    const now = new Date();
    const dateString = now.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
    const timeString = now.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
    const timestamp = `${dateString} ${timeString}`;
    
    // Update applications array with the new audit log entry
    const updatedApplications = [...applications];
    updatedApplications[currentAppIndex] = {
      ...updatedApplications[currentAppIndex],
      auditLog: [
        {
          date: timestamp,
          admin: "Admin User",
          action: "Sent document request",
          note: adminNote
        },
        ...updatedApplications[currentAppIndex].auditLog
      ]
    };
    
    setApplications(updatedApplications);
    setAdminNote("");
  };

  // Handle document request - now uses the adminNote input
  const handleRequestDocument = () => {
    if (!adminNote.trim()) return;
    
    const now = new Date();
    const dateString = now.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
    const timeString = now.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
    const timestamp = `${dateString} ${timeString}`;
    
    // Update applications array with the new requested document and audit log entry
    const updatedApplications = [...applications];
    updatedApplications[currentAppIndex] = {
      ...updatedApplications[currentAppIndex],
      requestedDocuments: [
        ...updatedApplications[currentAppIndex].requestedDocuments || [],
        {
          type: adminNote,
          status: "Requested",
          requestDate: dateString
        }
      ],
      auditLog: [
        {
          date: timestamp,
          admin: "Admin User",
          action: "Requested document",
          note: `Please provide ${adminNote}`
        },
        ...updatedApplications[currentAppIndex].auditLog
      ]
    };
    
    setApplications(updatedApplications);
    setAdminNote("");
  };

  // Navigate to previous application
  const handlePrevApplication = () => {
    if (currentAppIndex > 0) {
      setCurrentAppIndex(currentAppIndex - 1);
    }
  };

  // Navigate to next application
  const handleNextApplication = () => {
    if (currentAppIndex < applications.length - 1) {
      setCurrentAppIndex(currentAppIndex + 1);
    }
  };

  return (
    <div className="md:w-[80%] md:absolute right-0 bottom-0 md:h-[89%] h-screen md:overflow-x-auto p-2">
      <div className="form-a-container">
        <div className="application-navigation">
          <div className="navigation-controls">
            <button
              className="nav-button"
              onClick={handlePrevApplication}
              disabled={currentAppIndex === 0}
            >
              <i className="fas fa-chevron-left"></i> Previous
            </button>
            <div className="application-counter">
              Application {currentAppIndex + 1} of {applications.length}
            </div>
            <button
              className="nav-button"
              onClick={handleNextApplication}
              disabled={currentAppIndex === applications.length - 1}
            >
              Next <i className="fas fa-chevron-right"></i>
            </button>
          </div>
        </div>

        <div className="form-header">
          <h1>Form A - Application {formData.id}</h1>
          <div
            className="status-badge"
            data-status={formData.status.toLowerCase()}
          >
            {formData.status}
          </div>
        </div>

        <div className="form-section">
          <h2>Applicant Information</h2>
          <div className="form-grid">
            <div className="form-row">
              <div className="form-label">Name_Tracking ID</div>
              <div className="form-value">
                {formData.userId}_{formData.trackingId}
              </div>
            </div>

            <div className="form-row">
              <div className="form-label">Full Name</div>
              <div className="form-value">{formData.userId}</div>
            </div>

            <div className="form-row">
              <div className="form-label">Email</div>
              <div className="form-value">{formData.email}</div>
            </div>

            <div className="form-row">
              <div className="form-label">Phone</div>
              <div className="form-value">{formData.phone}</div>
            </div>
          </div>
        </div>

        <div className="form-section">
          <h2>Education Details</h2>
          <div className="form-grid">
            <div className="form-row">
              <div className="form-label">School</div>
              <div className="form-value form-value-with-action">
                <span>{formData.school}</span>
                <button className="action-button">
                  <i className="fas fa-download"></i> Download
                </button>
              </div>
            </div>

            <div className="form-row">
              <div className="form-label">Major</div>
              <div className="form-value">{formData.major}</div>
            </div>

            <div className="form-row">
              <div className="form-label">Users</div>
              <div className="form-value">
                {formData.userId} - {formData.amount}
              </div>
            </div>

            <div className="form-row">
              <div className="form-label">Signature</div>
              <div className="form-value form-value-with-action">
                <div className="signature-preview">
                  <Image
                    src={`/`}
                    alt={`${formData.userId}'s signature`}
                    className="signature-image"
                    width={100}
                    height={100}
                  />
                </div>
                <div className="action-buttons">
                  <button className="action-button">
                    <i className="fas fa-download"></i> Download
                  </button>
                  <button className="action-button">
                    <i className="fas fa-eye"></i> View
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="form-section">
          <h2>Documents</h2>
          <div className="form-grid">
            {formData.documents.map((doc, index) => (
              <div key={index} className="form-row">
                <div className="form-label">{doc.type}</div>
                <div className="form-value form-value-with-action">
                  <span>{doc.name}</span>
                  <div className="action-buttons">
                    <button className="action-button">
                      <i className="fas fa-download"></i> Download
                    </button>
                    <button className="action-button">
                      <i className="fas fa-eye"></i> View
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {formData.requestedDocuments &&
          formData.requestedDocuments.length > 0 && (
            <div className="form-section">
              <h2>Requested Documents</h2>
              <div className="form-grid">
                {formData.requestedDocuments.map((doc, index) => (
                  <div key={index} className="form-row">
                    <div className="form-label">{doc.type}</div>
                    <div className="form-value">
                      <div className="requested-doc-info">
                        <span
                          className="requested-doc-status"
                          data-status={doc.status
                            .toLowerCase()
                            .replace(/\s+/g, "-")}
                        >
                          {doc.status}
                        </span>
                        <span className="requested-doc-date">
                          Requested on: {doc.requestDate}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        <div className="form-section">
          <h2>Admin Actions</h2>
          <div className="admin-note-section">
            <textarea
              className="admin-note-input"
              placeholder="Enter document request or add a note about this application..."
              value={adminNote}
              onChange={(e) => setAdminNote(e.target.value)}
            ></textarea>
            <div className="admin-buttons">
              <div className="admin-primary-buttons">
                <button
                  className="send-button"
                  onClick={handleSendDocumentRequest}
                >
                  <i className="fas fa-paper-plane"></i> Send
                </button>
                <button
                  className="request-doc-button"
                  onClick={handleRequestDocument}
                >
                  <i className="fas fa-file-upload"></i> Request Document
                </button>
              </div>
              <div className="action-buttons">
                <button
                  className="approve-button"
                  onClick={handleApprove}
                  disabled={formData.status === "Approved"}
                >
                  Approve
                </button>
                <button
                  className="deny-button"
                  onClick={handleDeny}
                  disabled={formData.status === "Denied"}
                >
                  Deny
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="audit-log-section">
          <h2>Audit Log</h2>
          <div className="audit-table">
            <div className="audit-header">
              <div className="audit-cell">Date/Time</div>
              <div className="audit-cell">Admin</div>
              <div className="audit-cell">Action</div>
              <div className="audit-cell">Note</div>
            </div>

            {formData.auditLog.map((log, index) => (
              <div key={index} className="audit-row">
                <div className="audit-cell">{log.date}</div>
                <div className="audit-cell">{log.admin}</div>
                <div className="audit-cell">{log.action}</div>
                <div className="audit-cell">{log.note}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default forms;
