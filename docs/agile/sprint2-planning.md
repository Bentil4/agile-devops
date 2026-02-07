# Sprint 2 Planning

**Sprint Duration:** 2 weeks  
**Sprint Goal:** Implement CI/CD pipeline, monitoring, and filtering capabilities

## Team Capacity
- Available story points: 11
- Team velocity (from Sprint 1): 21 points (adjusted for improvements)

## Sprint Backlog

### Selected User Stories

1. **User Story 4: CI/CD Pipeline** (5 points)
   - Create GitHub Actions workflow
   - Automated testing on push/PR
   - Build verification step
   - Health check validation
   - Coverage reporting

2. **User Story 5: Monitoring and Health Checks** (3 points)
   - Implement /health endpoint
   - Implement /metrics endpoint
   - Request counting
   - Memory usage tracking
   - Uptime tracking

3. **User Story 6: Todo Filtering** (3 points)
   - Filter by completed status
   - Filter by priority
   - Combined filter support
   - Add tests for filtering

## Tasks Breakdown

### Day 1-3: CI/CD Pipeline
- [x] Research GitHub Actions
- [x] Create workflow file
- [x] Configure test job
- [x] Configure build job
- [x] Configure health check job
- [x] Test pipeline with sample commit

### Day 4-6: Monitoring Implementation
- [x] Create monitoring middleware
- [x] Implement health endpoint
- [x] Implement metrics endpoint
- [x] Add request counting
- [x] Add memory usage tracking
- [x] Write tests for monitoring

### Day 7-9: Filtering Feature
- [x] Implement completed filter
- [x] Implement priority filter
- [x] Support multiple filters
- [x] Write comprehensive tests
- [x] Update documentation

### Day 10: Final Testing & Review
- [x] Integration testing
- [x] Documentation updates
- [x] Sprint review preparation
- [x] Retrospective preparation

## Definition of Done
- [x] All code reviewed and merged
- [x] All tests passing
- [x] CI/CD pipeline working
- [x] Code coverage maintained >70%
- [x] No critical bugs
- [x] Documentation updated
- [x] Sprint review conducted

## Improvements from Sprint 1 Retrospective

### 1. Automated Code Quality (ESLint)
- **Action:** Setup ESLint configuration
- **Status:** ✅ Completed
- **Impact:** Consistent code style, fewer review comments

### 2. Faster Code Reviews
- **Target:** 4-hour SLA for initial review
- **Status:** ✅ Achieved
- **Impact:** Faster development velocity

### 3. CI/CD Automation
- **Action:** Implement GitHub Actions
- **Status:** ✅ Completed
- **Impact:** Automated testing, reduced manual effort

## Daily Standup Notes

### Day 1
- **Done:** Sprint planning complete
- **Today:** Starting CI/CD pipeline setup
- **Blockers:** None

### Day 3
- **Done:** GitHub Actions workflow created and tested
- **Today:** Starting monitoring implementation
- **Blockers:** None

### Day 6
- **Done:** Health and metrics endpoints implemented
- **Today:** Starting filtering feature
- **Blockers:** None

### Day 9
- **Done:** All filtering tests passing
- **Today:** Final integration testing
- **Blockers:** None

### Day 10
- **Done:** All features complete and tested
- **Today:** Sprint review and retrospective
- **Blockers:** None

## Sprint Risks & Mitigation

**Risk:** GitHub Actions unfamiliarity
- **Mitigation:** ✅ Allocated extra time for research (Day 1)
- **Outcome:** Successful implementation

**Risk:** Monitoring metrics accuracy
- **Mitigation:** ✅ Comprehensive testing of metrics
- **Outcome:** Accurate tracking implemented
