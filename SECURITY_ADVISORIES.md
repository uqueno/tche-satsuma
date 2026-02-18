# Security Advisories - Tche Satsuma

This document tracks security vulnerabilities discovered and patched in the project.

## Active Advisories

### ✅ FIXED: Next.js HTTP Request Deserialization DoS (2026-02-18)

**Severity**: High  
**Status**: Fixed  
**CVE**: N/A (vendor advisory)

#### Description
Next.js versions 13.0.0 through 15.0.7 (and various pre-release versions) contain a vulnerability where HTTP request deserialization can lead to Denial of Service (DoS) when using insecure React Server Components.

#### Affected Versions
- >= 13.0.0, < 15.0.8
- Multiple pre-release branches (15.1.x, 15.2.x, 15.3.x, 15.4.x, 15.5.x, 15.6.x, 16.0.x, 16.1.x)

#### Patched Versions
- 15.0.8 (stable)
- 15.1.12
- 15.2.9
- 15.3.9
- 15.4.11
- 15.5.10
- 15.6.0-canary.61
- 16.0.11
- 16.1.5

#### Impact
Could allow attackers to cause denial of service through specially crafted HTTP requests when using React Server Components.

#### Resolution
Updated Next.js dependency from `^14.0.0` to `^15.0.8` in package.json.

**Fixed in commit**: [Current commit]  
**Fixed by**: GitHub Copilot Agent  
**Date**: 2026-02-18

#### Verification
```bash
npm audit
# Should show no vulnerabilities for Next.js
```

#### References
- Next.js Security Advisory
- Package: `next`
- Ecosystem: npm

---

## Historical Advisories

_No historical advisories at this time._

---

## Security Monitoring

### Automated Checks

The project uses the following automated security checks:

1. **npm audit** - Runs automatically in CI/CD
2. **Dependabot** - GitHub automated dependency updates (recommended to enable)
3. **CodeQL** - Static analysis for security vulnerabilities

### Manual Review Schedule

- **Dependencies**: Monthly review (`npm audit`)
- **Security Updates**: Applied within 1 week of disclosure
- **Critical Updates**: Applied within 24 hours

### Reporting Security Issues

If you discover a security vulnerability:

1. **DO NOT** open a public issue
2. Email: security@tchesatsuma.org (or appropriate contact)
3. Include:
   - Description of vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if available)

### Security Response Process

1. **Acknowledgment**: Within 24 hours
2. **Assessment**: Within 48 hours
3. **Fix Development**: Within 1 week (critical: 24 hours)
4. **Testing**: Thorough validation
5. **Deployment**: To production
6. **Disclosure**: After patch is deployed

---

## Best Practices

### For Developers

- Always run `npm audit` before committing
- Keep dependencies up to date
- Review security advisories weekly
- Use `npm audit fix` for automated fixes
- Review `npm audit fix --force` changes carefully

### For Operations

- Monitor security mailing lists
- Subscribe to Next.js security advisories
- Enable GitHub security alerts
- Schedule regular dependency updates
- Maintain test coverage for security-critical code

---

**Last Updated**: 2026-02-18  
**Next Review**: 2026-03-18  
**Maintained By**: Security Team
