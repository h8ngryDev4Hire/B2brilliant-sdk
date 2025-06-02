/**
 * Basic usage example for the B2B Campaign Agent SDK
 */

// In production, you would import like this:
// const Agent = require('b2brilliant-sdk');

// For development/testing, import from local path
const Agent = require('../src/index');

// Initialize with your API key
const agent = new Agent({
  apiKey: 'your-api-key-here',
});

async function runExample() {
  try {
    console.log('Discovering user business information...');
    const userBusiness = await agent.user.discover([
      'https://yourbusiness.com'
    ], {
      findCompetitors: true,  // Optional: find competitors
      findBranding: true      // Optional: find branding information
    });
    console.log('✅ User business discovered:', userBusiness.profile.name);

    console.log('\nDiscovering target business information...');
    const targetBusiness = await agent.business.discover([
      'https://targetbusiness.com'
    ]);
    console.log('✅ Target business discovered:', targetBusiness.profile.name);

    console.log('\nChecking business compatibility...');
    const compatibility = await agent.business.compatibility(userBusiness, targetBusiness);
    console.log(`✅ Compatibility score: ${compatibility.score}/10`);
    console.log('Positives:', compatibility.reasoning.positives);

    console.log('\nGenerating campaigns...');
    const campaigns = await agent.campaigns.create(userBusiness, targetBusiness);
    console.log(`✅ Generated ${campaigns.campaigns.length} campaigns`);
    
    // Display the email campaign content
    const emailCampaign = campaigns.campaigns.find(c => c.type === 'email');
    if (emailCampaign) {
      console.log('\nEmail Campaign:');
      console.log('-------------------------------------------');
      console.log(emailCampaign.content);
      console.log('-------------------------------------------');
      console.log(`Rating: ${emailCampaign.rating}/10`);
    }

    console.log('\nRefining the campaign with feedback...');
    const refinedCampaigns = await agent.campaigns.refine(
      userBusiness,
      targetBusiness,
      campaigns,
      "Make the tone more professional and focus on their recent funding"
    );
    console.log('✅ Campaign refined');

    // Display the refined email campaign content
    const refinedEmailCampaign = refinedCampaigns.campaigns.find(c => c.type === 'email');
    if (refinedEmailCampaign) {
      console.log('\nRefined Email Campaign:');
      console.log('-------------------------------------------');
      console.log(refinedEmailCampaign.content);
      console.log('-------------------------------------------');
      console.log(`Rating: ${refinedEmailCampaign.rating}/10`);
    }

  } catch (error) {
    console.error('Error:', error);
    if (error.name === 'ApiError') {
      console.error(`API Error (${error.status}):`, error.message);
      console.error('Details:', error.data);
    }
  }
}

// Run the example
runExample().then(() => console.log('Example completed')); 