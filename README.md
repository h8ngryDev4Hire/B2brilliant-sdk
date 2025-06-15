# B2Brilliant Campaign Agent SDKs

Official Software Development Kits (SDKs) for the [B2Brilliant Campaign Agent API](https://github.com/h8ngryDev4Hire/B2brilliant-sdk). Generate personalized B2B campaigns by analyzing business websites and social media profiles.

## 🚀 **Currently in Beta**

B2Brilliant is currently in beta! Visit [B2Brilliant.app](https://b2brilliant.app) to sign up for beta access and get your API key.

## 📦 **Available SDKs**

We provide SDKs in multiple programming languages to fit your development needs:

### TypeScript/JavaScript SDK
- **Package**: `b2brilliant-sdk`
- **Install**: `npm install b2brilliant-sdk`
- **Best for**: Web applications, Node.js backends, TypeScript projects
- **Documentation**: [TypeScript SDK →](https://www.b2brilliant.app/docs#typescript-sdk)

### Python SDK
- **Package**: `b2brilliant-sdk`
- **Install**: `pip install b2brilliant-sdk`
- **Best for**: Data science, automation scripts, Python backends
- **Documentation**: [Python SDK →](https://www.b2brilliant.app/docs#python-sdk)

## 🔧 **Quick Start**

### TypeScript/JavaScript
```typescript
import { B2BrilliantAgent } from 'b2brilliant-sdk';

const agent = new B2BrilliantAgent({
  apiKey: 'your-api-key'
});

// Discover your business
const userBusiness = await agent.user.discover(['https://yourbusiness.com']);

// Discover target business
const targetBusiness = await agent.business.discover(['https://targetbusiness.com']);

// Generate campaigns
const campaigns = await agent.campaigns.create(userBusiness, targetBusiness);
```

### Python
```python
from b2brilliant_sdk import B2BrilliantAgent

agent = B2BrilliantAgent(api_key="your-api-key")

# Discover your business
user_business = agent.user.discover(["https://yourbusiness.com"])

# Discover target business
target_business = agent.business.discover(["https://targetbusiness.com"])

# Generate campaigns
campaigns = agent.campaigns.create(user_business, target_business)
```

## ⚡ **Core Features**

Both SDKs provide the same powerful functionality:

### **Business Discovery**
- Analyze websites to extract business information
- Discover competitors and industry insights
- Extract branding voice, tone, and style
- Find key contacts and decision makers

### **Campaign Generation**
- Generate personalized email campaigns
- Create social media DM sequences
- Develop SMS outreach strategies
- Customize tone and messaging

### **Compatibility Analysis**
- Assess business compatibility scores
- Get detailed reasoning and recommendations
- Identify partnership opportunities

### **Data Refinement**
- Enhance business profiles with additional context
- Refine campaigns based on feedback
- Iteratively improve targeting and messaging

## 🛠 **Use Cases**

- **Sales Teams**: Generate personalized outreach campaigns
- **Marketing Agencies**: Create targeted campaigns for clients
- **Business Development**: Identify and engage potential partners
- **Lead Generation**: Automate initial prospect research
- **Account Management**: Personalize communication with existing clients

## 📚 **Getting Started**

1. **Sign up for beta access** at [B2Brilliant.app](https://b2brilliant.app)
2. **Get your API key** from the dashboard
3. **Choose your SDK** based on your tech stack:
   - [TypeScript/JavaScript Documentation](https://www.b2brilliant.app/docs#typescript-sdk)
   - [Python Documentation](https://www.b2brilliant.app/docs#python-sdk)
4. **Install and start building!**

## 🔗 **Related Projects**

- **[B2Brilliant Platform](https://www.b2brilliant.app)**: Main B2Brilliant web application and platform
- **[MCP Server](https://github.com/h8ngryDev4Hire/B2brilliant-sdk)**: Model Context Protocol server for Claude Desktop integration


## 🤝 **Contributing**

We welcome contributions to both SDKs! Visit our [GitHub repository](https://github.com/h8ngryDev4Hire/B2brilliant-sdk) for development setup and contribution guidelines.

## 📄 **License**

MIT License - see our [LICENSE](LICENSE.md) for details.

## 🆘 **Support**

- **Documentation**: Visit [B2Brilliant Documentation](https://www.b2brilliant.app/docs)
- **Issues**: Report bugs on our [GitHub repository](https://github.com/h8ngryDev4Hire/B2brilliant-sdk/issues)
- **Beta Access**: Visit [B2Brilliant.app](https://www.b2brilliant.app) for support

---

**Choose your preferred SDK and start building personalized B2B campaigns today!** 🚀 