# frozen_string_literal: true

namespace :heroku do
  desc 'Delete the custom domain record set up for the Review App'
  task :review_app_predestroy do
    require 'aws-sdk-route53'

    # Q: do we ever want to do non-sandbox PR review?
    openstax_domain = 'labs.sandbox.openstax.org'

    # Environment variables are provided when specified in app.json
    heroku_app_name = ENV['HEROKU_APP_NAME']
    pr_number = ENV['HEROKU_PR_NUMBER']
    subdomain = "PR-#{pr_number}"
    hostname = [subdomain, openstax_domain].join('.')

    # Fetch CNAME value
    heroku_client = PlatformAPI.connect_oauth ENV['HEROKU_API_TOKEN']
    heroku_domain = heroku_client.domain.info(heroku_app_name, hostname)['cname']

    # Delete CNAME record from Route53 - credentials are in ENV
    aws_creds = Aws::AssumeRoleCredentials.new(
      {
        role_arn: 'arn:aws:iam::373045849756:role/research-labs-dns',
        role_session_name: 'HerokuLabsReview'
      })
    r53 = Aws::Route53::Client.new({ credentials: aws_creds })
    # DNS zone name ends with a fullstop
    domain = r53.list_hosted_zones.hosted_zones.select { |zone|
      zone[:name] == "#{openstax_domain}."
    }[0]
    abort "Domain #{openstax_domain} does not exist" unless domain
    zone_id = domain.id

    r53.change_resource_record_sets(
      {
        hosted_zone_id: zone_id,
        change_batch: {
          changes: [
            {
              action: 'DELETE',
              resource_record_set: {
                name: hostname,
                type: 'CNAME',
                ttl: 60,
                resource_records: [
                  {
                    value: heroku_domain
                  }
                ]
              }
            }
          ],
          comment: "Review domain for labs #{subdomain}"
        }
      })

  end
end
