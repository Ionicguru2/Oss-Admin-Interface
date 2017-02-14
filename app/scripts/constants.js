angular.module('oss')

.constant('API', {
    // base: 'http://localhost:8000/api/v1/',
    base: 'http://ossapi.stg.kpd-i.com/api/v1/',
    user_all: 'user',
    user_create: 'user/create',
    user_login: 'user/login',
    user_id: 'user/',
    user_logout: 'user/logout',
    user_suspend: 'user/suspend/',

    company_all: 'company',
    company_id: 'company/',
    company_create: 'company/create',
    company_users: 'company/{id}/users',

    contracts: 'contract',
    contracts_for_user: 'contract/user/',
    contract_create: 'contract/create',
    contracts_for_folder: 'contract/folder/',
    contract_document: 'contract/document/',
    contract_move: 'contract/{id}/folder/{folder_id}',
    contract_delete: 'contract/',
    contract_company: 'contract/company/{id}',
    contract_user: 'contract/user/{id}',

    transaction_all: 'transaction',
    transaction_company: 'transaction/company/',
    transaction_user: 'transaction/user/',
    transaction_approve: 'transaction/approve/{id}',
    transaction_deny: 'transaction/deny/{id}',

    validation_approve: 'transaction/validated/{id}',
    validation_deny: 'transaction/validation_failed/{id}',

    product_all: 'product',
    product_id: 'product/',
    product_create: 'product/create',
    product_company: 'company/{id}/products',
    product_user: 'user/{id}/products',

    category_all: 'category',

    country_all: 'country',
    region_all: 'region'

})
.constant('UserRole', {
	BASIC: 'basic',
	CSR: 'csr',
	POWER: 'power',
	ADMIN: 'admin'
})
.constant('STATUS', {
    PENDING_VALIDATION: 'validation_pending',
    PENDING_APPROVAL_STATUS: 'pending_admin_approval',
    TRANSACTION_STATUS_EXPIRED: 'expired',
    PRODUCTION_STATUS_POSTED: 'posted',
    PRODUCTION_STATUS_CREATED: 'created',
});
