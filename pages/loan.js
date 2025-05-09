import "../styles/nav.css";
import { useState, useEffect } from "react";
import DashboardLayout from "../component/DashboardLayout";
import { Search, Calendar, Phone, FileText, AlertCircle, CheckCircle, Clock, DollarSign, User, Filter } from "lucide-react";

export default function LoanPage() {
  // Sample data - In a real application, this would come from your API
  const [loans, setLoans] = useState([]);
  const [users, setUsers] = useState([]);
  const [filteredLoans, setFilteredLoans] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [view, setView] = useState("loans"); // loans, statements, userDetails

  useEffect(() => {
    // Simulate data fetching from an API
    const fetchData = () => {
      // Sample loan data
      const loanData = [
        {
          id: 1,
          userId: 101,
          amount: 5000,
          amountPaid: 1500,
          issueDate: "2025-03-15",
          dueDate: "2025-06-15",
          status: "active",
          interestRate: 5.5,
          paymentsHistory: [
            { date: "2025-04-15", amount: 750 },
            { date: "2025-05-15", amount: 750 },
          ]
        },
        {
          id: 2,
          userId: 102,
          amount: 10000,
          amountPaid: 0,
          issueDate: "2025-04-01",
          dueDate: "2025-05-10",
          status: "overdue",
          interestRate: 6.0,
          paymentsHistory: []
        },
        {
          id: 3,
          userId: 103,
          amount: 2500,
          amountPaid: 2500,
          issueDate: "2025-01-10",
          dueDate: "2025-04-10",
          status: "completed",
          interestRate: 5.0,
          paymentsHistory: [
            { date: "2025-02-10", amount: 850 },
            { date: "2025-03-10", amount: 850 },
            { date: "2025-04-10", amount: 800 },
          ]
        },
        {
          id: 4,
          userId: 101,
          amount: 7500,
          amountPaid: 2000,
          issueDate: "2025-02-20",
          dueDate: "2025-05-20",
          status: "warning", // due soon
          interestRate: 5.2,
          paymentsHistory: [
            { date: "2025-03-20", amount: 1000 },
            { date: "2025-04-20", amount: 1000 },
          ]
        },
        {
          id: 5,
          userId: 104,
          amount: 15000,
          amountPaid: 5000,
          issueDate: "2025-03-05",
          dueDate: "2025-08-05",
          status: "active",
          interestRate: 6.5,
          paymentsHistory: [
            { date: "2025-04-05", amount: 2500 },
            { date: "2025-05-01", amount: 2500 },
          ]
        }
      ];

      // Sample user data
      const userData = [
        {
          id: 101,
          name: "John Smith",
          email: "john.smith@example.com",
          phone: "+1 (555) 123-4567",
          address: "123 Main St, Anytown, CA 90210",
          creditScore: 720
        },
        {
          id: 102,
          name: "Sarah Johnson",
          email: "sarah.j@example.com",
          phone: "+1 (555) 234-5678",
          address: "456 Oak Ave, Somewhere, NY 10001",
          creditScore: 680
        },
        {
          id: 103,
          name: "Michael Chen",
          email: "mchen@example.com",
          phone: "+1 (555) 345-6789",
          address: "789 Pine Rd, Nowhere, TX 75001",
          creditScore: 750
        },
        {
          id: 104,
          name: "Jessica Williams",
          email: "jwilliams@example.com",
          phone: "+1 (555) 456-7890",
          address: "321 Elm Blvd, Everywhere, FL 33101",
          creditScore: 700
        }
      ];

      setLoans(loanData);
      setFilteredLoans(loanData);
      setUsers(userData);
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Filter loans based on search term and status filter
    let filtered = loans;
    
    if (searchTerm) {
      filtered = filtered.filter(loan => {
        const user = users.find(u => u.id === loan.userId);
        return user && user.name.toLowerCase().includes(searchTerm.toLowerCase());
      });
    }
    
    if (statusFilter !== "all") {
      filtered = filtered.filter(loan => loan.status === statusFilter);
    }
    
    setFilteredLoans(filtered);
  }, [searchTerm, statusFilter, loans, users]);

  const handleLoanSelect = (loan) => {
    setSelectedLoan(loan);
    const user = users.find(u => u.id === loan.userId);
    setSelectedUser(user);
    setView("userDetails");
  };

  const handleViewStatements = (loan) => {
    setSelectedLoan(loan);
    setView("statements");
  };

  const getDaysUntilDue = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'completed':
        return "bg-green-100 text-green-800";
      case 'active':
        return "bg-blue-100 text-blue-800";
      case 'overdue':
        return "bg-red-100 text-red-800";
      case 'warning':
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      case 'active':
        return <Clock className="w-4 h-4" />;
      case 'overdue':
        return <AlertCircle className="w-4 h-4" />;
      case 'warning':
        return <Clock className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const renderLoansView = () => (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-2xl font-bold">Loan Administration</h2>
        <div className="flex items-center space-x-2 w-full md:w-auto">
          <div className="relative flex-grow md:w-64">
            <input
              type="text"
              placeholder="Search by borrower name..."
              className="pl-9 pr-4 py-2 border rounded-lg w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          </div>
          <select
            className="border rounded-lg p-2"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="overdue">Overdue</option>
            <option value="warning">Due Soon</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Borrower</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Progress</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredLoans.length > 0 ? (
                filteredLoans.map((loan) => {
                  const user = users.find(u => u.id === loan.userId);
                  const daysUntilDue = getDaysUntilDue(loan.dueDate);
                  const progressPercentage = (loan.amountPaid / loan.amount) * 100;
                  
                  return (
                    <tr key={loan.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                            <User className="h-6 w-6 text-gray-500" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{user?.name || 'Unknown'}</div>
                            <div className="text-sm text-gray-500">{user?.email || 'No email'}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{formatCurrency(loan.amount)}</div>
                        <div className="text-xs text-gray-500">{loan.interestRate}% interest</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div 
                            className="bg-blue-600 h-2.5 rounded-full" 
                            style={{ width: `${progressPercentage}%` }}
                          ></div>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {formatCurrency(loan.amountPaid)} of {formatCurrency(loan.amount)} ({progressPercentage.toFixed(0)}%)
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1 text-gray-500" />
                          <span className="text-sm text-gray-900">{new Date(loan.dueDate).toLocaleDateString()}</span>
                        </div>
                        {daysUntilDue <= 0 ? (
                          <div className="text-xs text-red-500">Overdue by {Math.abs(daysUntilDue)} days</div>
                        ) : daysUntilDue <= 10 ? (
                          <div className="text-xs text-yellow-500">Due in {daysUntilDue} days</div>
                        ) : (
                          <div className="text-xs text-gray-500">Due in {daysUntilDue} days</div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(loan.status)}`}>
                          {getStatusIcon(loan.status)}
                          <span className="ml-1 capitalize">{loan.status}</span>
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button 
                          onClick={() => handleLoanSelect(loan)}
                          className="text-indigo-600 hover:text-indigo-900 mr-3"
                        >
                          Details
                        </button>
                        <button 
                          onClick={() => handleViewStatements(loan)}
                          className="text-green-600 hover:text-green-900"
                        >
                          Statement
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                    No loans found matching your criteria
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="font-medium text-gray-700 mb-2 flex items-center">
            <AlertCircle className="h-5 w-5 mr-2 text-red-500" />
            Overdue Loans
          </h3>
          <p className="text-2xl font-bold">
            {loans.filter(loan => loan.status === 'overdue').length}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="font-medium text-gray-700 mb-2 flex items-center">
            <Clock className="h-5 w-5 mr-2 text-yellow-500" />
            Due Soon
          </h3>
          <p className="text-2xl font-bold">
            {loans.filter(loan => loan.status === 'warning').length}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="font-medium text-gray-700 mb-2 flex items-center">
            <DollarSign className="h-5 w-5 mr-2 text-green-500" />
            Active Loans
          </h3>
          <p className="text-2xl font-bold">
            {loans.filter(loan => loan.status === 'active').length}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="font-medium text-gray-700 mb-2 flex items-center">
            <CheckCircle className="h-5 w-5 mr-2 text-blue-500" />
            Completed
          </h3>
          <p className="text-2xl font-bold">
            {loans.filter(loan => loan.status === 'completed').length}
          </p>
        </div>
      </div>
    </div>
  );

  const renderUserDetailsView = () => {
    if (!selectedLoan || !selectedUser) return null;
    
    const userLoans = loans.filter(loan => loan.userId === selectedUser.id);
    const totalActive = userLoans.filter(loan => loan.status === 'active' || loan.status === 'warning' || loan.status === 'overdue')
      .reduce((sum, loan) => sum + loan.amount - loan.amountPaid, 0);
    
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Borrower Details</h2>
          <button 
            onClick={() => setView('loans')}
            className="py-2 px-4 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Back to Loans
          </button>
        </div>

        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="md:flex">
            <div className="p-6 md:w-1/3 border-r">
              <div className="flex items-center mb-6">
                <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center">
                  <User className="h-8 w-8 text-gray-500" />
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-medium">{selectedUser.name}</h3>
                  <p className="text-gray-500">{selectedUser.email}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Phone Number</p>
                  <div className="flex items-center mt-1">
                    <Phone className="h-4 w-4 text-gray-500 mr-2" />
                    <p>{selectedUser.phone}</p>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Address</p>
                  <p className="mt-1">{selectedUser.address}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Credit Score</p>
                  <p className="text-lg font-medium mt-1">{selectedUser.creditScore}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Total Active Debt</p>
                  <p className="text-lg font-medium mt-1">{formatCurrency(totalActive)}</p>
                </div>
              </div>
            </div>
            
            <div className="p-6 md:w-2/3">
              <h3 className="text-xl font-medium mb-4">Loan History</h3>
              
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left pb-3 px-2">Loan ID</th>
                      <th className="text-left pb-3 px-2">Amount</th>
                      <th className="text-left pb-3 px-2">Issue Date</th>
                      <th className="text-left pb-3 px-2">Due Date</th>
                      <th className="text-left pb-3 px-2">Status</th>
                      <th className="text-left pb-3 px-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userLoans.map(loan => (
                      <tr key={loan.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-2">#{loan.id}</td>
                        <td className="py-3 px-2">{formatCurrency(loan.amount)}</td>
                        <td className="py-3 px-2">{new Date(loan.issueDate).toLocaleDateString()}</td>
                        <td className="py-3 px-2">{new Date(loan.dueDate).toLocaleDateString()}</td>
                        <td className="py-3 px-2">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(loan.status)}`}>
                            {getStatusIcon(loan.status)}
                            <span className="ml-1 capitalize">{loan.status}</span>
                          </span>
                        </td>
                        <td className="py-3 px-2">
                          <button 
                            onClick={() => handleViewStatements(loan)}
                            className="text-blue-600 hover:text-blue-900 text-sm"
                          >
                            View Statement
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderStatementsView = () => {
    if (!selectedLoan) return null;
    
    const user = users.find(u => u.id === selectedLoan.userId);
    const remainingAmount = selectedLoan.amount - selectedLoan.amountPaid;
    const progressPercentage = (selectedLoan.amountPaid / selectedLoan.amount) * 100;
    const daysUntilDue = getDaysUntilDue(selectedLoan.dueDate);
    
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Loan Statement</h2>
          <button 
            onClick={() => setView('loans')}
            className="py-2 px-4 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Back to Loans
          </button>
        </div>
        
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-6 border-b">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-medium">Statement for Loan #{selectedLoan.id}</h3>
                <p className="text-gray-500">Generated on {new Date().toLocaleDateString()}</p>
              </div>
              <button className="flex items-center py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                <FileText className="h-4 w-4 mr-2" />
                Download PDF
              </button>
            </div>
          </div>
          
          <div className="md:flex">
            <div className="p-6 md:w-1/3 border-r">
              <h4 className="font-medium mb-4">Loan Summary</h4>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Borrower:</span>
                  <span className="font-medium">{user?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Loan Amount:</span>
                  <span className="font-medium">{formatCurrency(selectedLoan.amount)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Interest Rate:</span>
                  <span className="font-medium">{selectedLoan.interestRate}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Issue Date:</span>
                  <span>{new Date(selectedLoan.issueDate).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Due Date:</span>
                  <span>{new Date(selectedLoan.dueDate).toLocaleDateString()}</span>
                </div>
                {daysUntilDue <= 0 ? (
                  <div className="text-red-500 text-center font-medium">
                    Overdue by {Math.abs(daysUntilDue)} days
                  </div>
                ) : daysUntilDue <= 10 ? (
                  <div className="text-yellow-500 text-center font-medium">
                    Due in {daysUntilDue} days
                  </div>
                ) : null}
                <div className="pt-4">
                  <div className="flex justify-between mb-1">
                    <span>Payment Progress</span>
                    <span>{progressPercentage.toFixed(0)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-blue-600 h-2.5 rounded-full" 
                      style={{ width: `${progressPercentage}%` }}
                    ></div>
                  </div>
                </div>
                <div className="pt-4 space-y-2">
                  <div className="flex justify-between font-medium">
                    <span>Amount Paid:</span>
                    <span className="text-green-600">{formatCurrency(selectedLoan.amountPaid)}</span>
                  </div>
                  <div className="flex justify-between font-medium">
                    <span>Remaining Balance:</span>
                    <span className="text-red-600">{formatCurrency(remainingAmount)}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-6 md:w-2/3">
              <h4 className="font-medium mb-4">Payment History</h4>
              
              {selectedLoan.paymentsHistory.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left pb-3">Date</th>
                        <th className="text-left pb-3">Amount</th>
                        <th className="text-left pb-3">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedLoan.paymentsHistory.map((payment, index) => (
                        <tr key={index} className="border-b hover:bg-gray-50">
                          <td className="py-3">{new Date(payment.date).toLocaleDateString()}</td>
                          <td className="py-3">{formatCurrency(payment.amount)}</td>
                          <td className="py-3">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Completed
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No payment history available for this loan
                </div>
              )}
              
              <div className="mt-8">
                <h4 className="font-medium mb-4">Upcoming Payments</h4>
                
                {selectedLoan.status !== 'completed' ? (
                  <div className="bg-gray-50 p-4 rounded-lg border">
                    <div className="flex justify-between mb-4">
                      <div>
                        <p className="text-sm text-gray-500">Next Payment Due</p>
                        <p className="font-medium">
                          {daysUntilDue <= 0 
                            ? "Immediately (Overdue)" 
                            : new Date(selectedLoan.dueDate).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Amount Due</p>
                        <p className="font-medium">{formatCurrency(remainingAmount)}</p>
                      </div>
                    </div>
                    <button className="w-full py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
                      Make Payment
                    </button>
                  </div>
                ) : (
                  <div className="text-center py-4 bg-green-50 rounded-lg border border-green-200">
                    <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
                    <p className="font-medium text-green-700">Loan fully paid</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderView = () => {
    switch(view) {
      case 'loans':
        return renderLoansView();
      case 'userDetails':
        return renderUserDetailsView();
      case 'statements':
        return renderStatementsView();
      default:
        return renderLoansView();
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {renderView()}
      </div>
    </DashboardLayout>
  );
}