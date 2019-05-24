class FormsController < ApplicationController
  # rubocop:disable all
  Stripe.api_key = ENV['secret_key']

  def index
    puts "===="
    # render "index"
  end

  def chargeStripe
    token = params[:stripeToken]

    charge = Stripe::Charge.create({
      amount: params[:amount],
      currency: 'eur',
      description: 'Item X bought',
      source: token,
      metadata: {
        'order_id' => 12_345,
        'user' => 'Admin'
      }
    })
  end
end
