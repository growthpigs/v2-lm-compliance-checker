"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateComplianceScore = calculateComplianceScore;
function calculateComplianceScore(input) {
    const weights = {
        accessibility: 0.4, // 40% of total score
        privacy: 0.2, // 20% of total score
        barAssociation: 0.2, // 20% of total score
        canSpam: 0.2 // 20% of total score
    };
    // Calculate accessibility score (0-100)
    const accessibilityScore = calculateAccessibilityScore(input.axeResults);
    // Calculate privacy score (0 or 100)
    const privacyScore = input.hasPrivacyPolicy ? 100 : 0;
    // Calculate bar association score (0 or 100)
    const barScore = input.barMention ? 100 : 0;
    // Calculate CAN-SPAM score (0-100)
    const canSpamScore = calculateCanSpamScore(input.canSpamResult);
    // Calculate weighted scores
    const weightedScores = {
        accessibility: accessibilityScore * weights.accessibility,
        privacy: privacyScore * weights.privacy,
        barAssociation: barScore * weights.barAssociation,
        canSpam: canSpamScore * weights.canSpam
    };
    // Calculate total score
    const totalScore = Math.round(weightedScores.accessibility +
        weightedScores.privacy +
        weightedScores.barAssociation +
        weightedScores.canSpam);
    // Generate recommendations
    const recommendations = generateRecommendations(input);
    return {
        score: totalScore,
        breakdown: {
            accessibility: accessibilityScore,
            privacy: privacyScore,
            barAssociation: barScore,
            canSpam: canSpamScore
        },
        recommendations
    };
}
function calculateAccessibilityScore(axeResults) {
    if (!axeResults.violations.length)
        return 100;
    // Weight violations by impact
    const impactWeights = {
        critical: 25,
        serious: 15,
        moderate: 10,
        minor: 5
    };
    let totalDeductions = 0;
    for (const violation of axeResults.violations) {
        const weight = impactWeights[violation.impact] || impactWeights.minor;
        totalDeductions += weight * violation.nodes.length;
    }
    // Cap deductions at 100 and ensure score doesn't go below 0
    return Math.max(0, 100 - Math.min(100, totalDeductions));
}
function calculateCanSpamScore(result) {
    let score = 0;
    if (result.hasContactInfo)
        score += 50;
    if (result.hasUnsubscribeInfo)
        score += 50;
    return score;
}
function generateRecommendations(input) {
    const recommendations = [];
    // Add accessibility recommendations
    if (input.axeResults.violations.length > 0) {
        recommendations.push('Fix accessibility violations to improve WCAG compliance', ...input.axeResults.violations.slice(0, 3).map(v => `Fix ${v.impact} issue: ${v.help}`));
    }
    // Add privacy policy recommendation
    if (!input.hasPrivacyPolicy) {
        recommendations.push('Add a privacy policy link to comply with privacy regulations');
    }
    // Add bar association recommendation
    if (!input.barMention) {
        recommendations.push('Include bar association information and attorney credentials');
    }
    // Add CAN-SPAM recommendations
    if (!input.canSpamResult.hasContactInfo) {
        recommendations.push('Add clear contact information to comply with CAN-SPAM Act');
    }
    if (!input.canSpamResult.hasUnsubscribeInfo) {
        recommendations.push('Include unsubscribe options in marketing communications');
    }
    return recommendations;
}
