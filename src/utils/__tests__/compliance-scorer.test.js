"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const complianceScorer_1 = require("../complianceScorer");
describe('Compliance Scorer', () => {
    // Mock data setup
    const mockAxeResults = {
        violations: [],
        passes: [],
        incomplete: [],
        inapplicable: [],
        timestamp: '',
        url: ''
    };
    const mockCanSpamResult = {
        hasContactInfo: false,
        hasUnsubscribeInfo: false,
        details: []
    };
    describe('calculateComplianceScore', () => {
        it('should return perfect score when all checks pass', () => {
            const input = {
                axeResults: { ...mockAxeResults },
                hasPrivacyPolicy: true,
                barMention: 'State Bar of California',
                canSpamResult: {
                    ...mockCanSpamResult,
                    hasContactInfo: true,
                    hasUnsubscribeInfo: true
                }
            };
            const result = (0, complianceScorer_1.calculateComplianceScore)(input);
            expect(result.score).toBe(100);
            expect(result.breakdown.accessibility).toBe(100);
            expect(result.breakdown.privacy).toBe(100);
            expect(result.breakdown.barAssociation).toBe(100);
            expect(result.breakdown.canSpam).toBe(100);
            expect(result.recommendations).toHaveLength(0);
        });
        it('should calculate correct score with accessibility violations', () => {
            const input = {
                axeResults: {
                    ...mockAxeResults,
                    violations: [
                        {
                            id: 'test-violation',
                            impact: 'critical',
                            nodes: [{}, {}], // 2 instances
                            description: '',
                            help: 'Fix critical issue',
                            helpUrl: '',
                            tags: []
                        }
                    ]
                },
                hasPrivacyPolicy: true,
                barMention: 'State Bar of California',
                canSpamResult: {
                    ...mockCanSpamResult,
                    hasContactInfo: true,
                    hasUnsubscribeInfo: true
                }
            };
            const result = (0, complianceScorer_1.calculateComplianceScore)(input);
            expect(result.score).toBe(80); // 50% deduction from accessibility (40% weight)
            expect(result.recommendations).toContain('Fix accessibility violations to improve WCAG compliance');
        });
        it('should calculate correct score with missing privacy policy', () => {
            const input = {
                axeResults: { ...mockAxeResults },
                hasPrivacyPolicy: false,
                barMention: 'State Bar of California',
                canSpamResult: {
                    ...mockCanSpamResult,
                    hasContactInfo: true,
                    hasUnsubscribeInfo: true
                }
            };
            const result = (0, complianceScorer_1.calculateComplianceScore)(input);
            expect(result.score).toBe(80); // Missing 20% from privacy
            expect(result.recommendations).toContain('Add a privacy policy link to comply with privacy regulations');
        });
        it('should calculate correct score with missing bar association', () => {
            const input = {
                axeResults: { ...mockAxeResults },
                hasPrivacyPolicy: true,
                barMention: null,
                canSpamResult: {
                    ...mockCanSpamResult,
                    hasContactInfo: true,
                    hasUnsubscribeInfo: true
                }
            };
            const result = (0, complianceScorer_1.calculateComplianceScore)(input);
            expect(result.score).toBe(80); // Missing 20% from bar association
            expect(result.recommendations).toContain('Include bar association information and attorney credentials');
        });
        it('should calculate correct score with missing CAN-SPAM requirements', () => {
            const input = {
                axeResults: { ...mockAxeResults },
                hasPrivacyPolicy: true,
                barMention: 'State Bar of California',
                canSpamResult: {
                    ...mockCanSpamResult,
                    hasContactInfo: false,
                    hasUnsubscribeInfo: false
                }
            };
            const result = (0, complianceScorer_1.calculateComplianceScore)(input);
            expect(result.score).toBe(80); // Missing 20% from CAN-SPAM
            expect(result.recommendations).toContain('Add clear contact information to comply with CAN-SPAM Act');
            expect(result.recommendations).toContain('Include unsubscribe options in marketing communications');
        });
        it('should handle worst case scenario with all checks failing', () => {
            const input = {
                axeResults: {
                    ...mockAxeResults,
                    violations: [
                        {
                            id: 'test-violation',
                            impact: 'critical',
                            nodes: Array(10).fill({}), // 10 critical violations
                            description: '',
                            help: 'Fix critical issue',
                            helpUrl: '',
                            tags: []
                        }
                    ]
                },
                hasPrivacyPolicy: false,
                barMention: null,
                canSpamResult: {
                    ...mockCanSpamResult,
                    hasContactInfo: false,
                    hasUnsubscribeInfo: false
                }
            };
            const result = (0, complianceScorer_1.calculateComplianceScore)(input);
            expect(result.score).toBe(0);
            expect(result.recommendations.length).toBeGreaterThan(0);
        });
    });
});
