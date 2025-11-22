import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Tenants from './pages/Tenants'
import Subscriptions from './pages/Subscriptions'
import Invoices from './pages/Invoices'
import Transactions from './pages/Transactions'
import CreditManagement from './pages/CreditManagement'
import Plans from './pages/Plans'
import Tickets from './pages/Tickets'
import WebhookSettings from './pages/WebhookSettings'
import PaymentSettings from './pages/PaymentSettings'
import WebsiteSettings from './pages/WebsiteSettings'
import SystemSettings from './pages/SystemSettings'
import SetupUsers from './pages/Setup/Users'
import SetupRoles from './pages/Setup/Roles'
import SetupDepartments from './pages/Setup/Departments'
import SetupLanguages from './pages/Setup/Languages'
import SetupTheme from './pages/Setup/Theme'
import SetupCurrency from './pages/Setup/Currency'
import SetupTaxes from './pages/Setup/Taxes'
import SetupFAQ from './pages/Setup/FAQ'
import SetupPages from './pages/Setup/Pages'
import SetupEmailTemplates from './pages/Setup/EmailTemplates'
import SetupSystemLogs from './pages/Setup/SystemLogs'
import SetupModules from './pages/Setup/Modules'
import ConnectWABA from './pages/ConnectWABA'
import Contact from './pages/Contact'
import Templates from './pages/Templates'
import Campaign from './pages/Campaign'
import BulkCampaign from './pages/BulkCampaign'
import MessageBot from './pages/MessageBot'
import TemplateBot from './pages/TemplateBot'
import BotFlow from './pages/BotFlow'
import AIAssistant from './pages/AIAssistant'
import AIAssistantCreate from './pages/AIAssistantCreate'
import AIAssistantChat from './pages/AIAssistantChat'
import Chat from './pages/Chat'
import ApplicationSettings from './pages/ApplicationSettings'
import AIIntegration from './pages/ApplicationSettings/AIIntegration'
import WhatsAppAutoLead from './pages/ApplicationSettings/WhatsAppAutoLead'
import StopBot from './pages/ApplicationSettings/StopBot'
import WhatsAppWebhook from './pages/ApplicationSettings/WhatsAppWebhook'
import SupportAgent from './pages/ApplicationSettings/SupportAgent'
import NotificationSound from './pages/ApplicationSettings/NotificationSound'
import AutoClearChat from './pages/ApplicationSettings/AutoClearChat'
import AIAssistantSettings from './pages/ApplicationSettings/AIAssistantSettings'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/connect-waba" element={<ConnectWABA />} />
          <Route path="/tenants" element={<Tenants />} />
          <Route path="/subscriptions" element={<Subscriptions />} />
          <Route path="/invoices" element={<Invoices />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/credit-management" element={<CreditManagement />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/templates" element={<Templates />} />
          <Route path="/campaign" element={<Campaign />} />
          <Route path="/bulk-campaign" element={<BulkCampaign />} />
          <Route path="/message-bot" element={<MessageBot />} />
          <Route path="/template-bot" element={<TemplateBot />} />
          <Route path="/bot-flow" element={<BotFlow />} />
          <Route path="/ai-assistant" element={<AIAssistant />} />
          <Route path="/ai-assistant/create" element={<AIAssistantCreate />} />
          <Route path="/ai-assistant/:id/chat" element={<AIAssistantChat />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/plans" element={<Plans />} />
          <Route path="/tickets" element={<Tickets />} />
          <Route path="/webhook-settings" element={<WebhookSettings />} />
          <Route path="/application-settings" element={<ApplicationSettings />}>
            <Route index element={<AIIntegration />} />
            <Route path="whatsapp-auto-lead" element={<WhatsAppAutoLead />} />
            <Route path="stop-bot" element={<StopBot />} />
            <Route path="webhook" element={<WhatsAppWebhook />} />
            <Route path="support-agent" element={<SupportAgent />} />
            <Route path="notification-sound" element={<NotificationSound />} />
            <Route path="ai-integration" element={<AIIntegration />} />
            <Route path="auto-clear-chat" element={<AutoClearChat />} />
            <Route path="ai-assistant" element={<AIAssistantSettings />} />
          </Route>
          <Route path="/payment-settings" element={<PaymentSettings />} />
          <Route path="/website-settings" element={<WebsiteSettings />} />
          <Route path="/system-settings" element={<SystemSettings />} />
          <Route path="/setup/users" element={<SetupUsers />} />
          <Route path="/setup/roles" element={<SetupRoles />} />
          <Route path="/setup/departments" element={<SetupDepartments />} />
          <Route path="/setup/languages" element={<SetupLanguages />} />
          <Route path="/setup/theme" element={<SetupTheme />} />
          <Route path="/setup/currency" element={<SetupCurrency />} />
          <Route path="/setup/taxes" element={<SetupTaxes />} />
          <Route path="/setup/faq" element={<SetupFAQ />} />
          <Route path="/setup/pages" element={<SetupPages />} />
          <Route path="/setup/email-templates" element={<SetupEmailTemplates />} />
          <Route path="/setup/system-logs" element={<SetupSystemLogs />} />
          <Route path="/setup/modules" element={<SetupModules />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App

