package com.afk.model.repository;

import com.afk.model.entity.Pago;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PagoRepository extends JpaRepository<Pago, Long> {

    Pago findByStripePaymentIntentId(String stripeIntentId);
}
