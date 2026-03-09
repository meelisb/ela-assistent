

## Estonian Academic Writing Assistant for ELA

### Overview
A professional chat interface for Estonian Aviation Academy students to get help with academic writing, featuring a collapsible sidebar with reference links and an AI-powered assistant using Anthropic's Claude.

### Design & Branding
- **Primary color**: ELA navy blue (#003087)
- **Clean, professional aesthetic** with white/light gray backgrounds
- **Responsive layout**: Sidebar (30%) + Chat area (70%)

### Layout Structure

**Left Sidebar (~30%)**
- Collapsible panel with toggle button
- "Allikad ja juhendid" (Sources & Guides) header
- Static reference links:
  - ELA akadeemilise kirjutamise juhend
  - Viitamise reeglid (APA formaat)
  - Lõputöö vormistamise nõuded
  - Akadeemiline stiil ja keelekasutus

**Main Chat Area (~70%)**
- Header with ELA branding
- Welcome message: "Tere tulemast ELA akadeemilise kirjutamise assistenti!"
- 3-4 Estonian starter questions as clickable buttons:
  - "Kuidas kirjutada sissejuhatust?"
  - "Kuidas viidata allikatele APA formaadis?"
  - "Kuidas struktureerida lõputööd?"
  - "Aita mind kokkuvõtte kirjutamisega"
- Scrollable message area with user/assistant message bubbles
- Input field at bottom with send button
- Loading indicator during API calls

### Technical Implementation

**Backend (Edge Function)**
- Create `anthropic-chat` edge function
- Proxy requests to Anthropic API (claude-sonnet-4-20250514)
- Store ANTHROPIC_API_KEY as a secret in Lovable Cloud
- Handle CORS and error responses

**Frontend**
- React state for chat history (useState)
- Streaming support for real-time responses
- Loading state with spinner while waiting
- Responsive sidebar collapse on mobile

### Setup Required
1. Enable Lovable Cloud
2. Add your Anthropic API key as a secret
3. You'll provide the system prompt separately

